import EventBus from "./eventBus";
import Handlebars from "handlebars";
import { nanoid } from "nanoid";

type PropsType = Record<string | symbol, string | number | boolean | object | null | undefined >;
type ChildrenType = {[key: string] : Block  | Block[] };
export type PropsWithChildrenType = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  [key : string | symbol]: string | number | boolean | Block  | Block[] | Function | object | null | undefined | PropsWithChildrenType
};

type MetaType = {
  tagName: string,
  props: PropsType
}

type EventsCollection = {
  [key: string] : EventListenerOrEventListenerObject;
}

// Нельзя создавать экземпляр данного класса
export default abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: "flow:render",
  };

  private _element : HTMLElement;
  private _meta : MetaType;
  _id = nanoid(6);

  eventBus: () => EventBus<string, Record<string, unknown[]>>;
  children : ChildrenType;
  props: PropsType;

  constructor(tagName = "div", propsWithChildren = {} as PropsWithChildrenType) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props.className === "string") {
      const classes = props.className.split(" ");
      this._element.classList.add(...classes);
    }

    if (props.attrs && typeof props.attrs === "object") {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element.setAttribute(attrName, attrValue as string);
      });
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsAndChildren : PropsWithChildrenType) {
    const children = {} as ChildrenType;
    const props = {} as PropsType;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });

        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
    console.log(`componentDidMount`);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps : PropsType, newProps : PropsType) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps : PropsType, _newProps : PropsType) {
    // compare props to determin if rerendering is required
    return true;
  }

  // stuff for mount / unmount DOM operations
  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _componentWillUnmount() {
    this.componentWillUnmount();
  }

  componentWillUnmount() {}



  setProps = (nextProps : PropsType) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    if (events) {
        Object.keys(events).forEach((eventName) => {
        this._element.addEventListener(eventName, (events as EventsCollection)[eventName]);
      });
    }
  }

  _removeEvents() {
    const { events = {} } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element.removeEventListener(eventName, (events as EventsCollection)[eventName]);
      });
    }
  }

  _compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (component) => `<div data-id="${component._id}"></div>`,
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template");
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const stub = (fragment as any).content.querySelector(
            `[data-id="${component._id}"]`,
          );

          stub?.replaceWith(component.getContent());
        });
      } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stub = (fragment as any).content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (fragment as any).content;
  }

  _render() {
    this._removeEvents();
    const block = this._compile();

    if (this._element.childNodes.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  render() {
    return "";
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props : PropsType) {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props as PropsType, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    console.log(`hide`);
    this.getContent().style.display = "none";
  }
}
