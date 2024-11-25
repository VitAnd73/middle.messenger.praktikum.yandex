import EventBus from "./eventBus";
import Handlebars from "handlebars";
import { nanoid } from "nanoid";

// type PropsType = string;
type PropsType = Record<string | symbol, string | object >;
// type PropsType = NamedNodeMap;
type ChildrenType<T> = {[key: string] : T  | T[] };
export type PropsWithChildrenType<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
  [key : string]: string | PropsType | T | T[] | any
};

// type PropsType1 = {
//   events?: any,
//   className?: string,
//   attrs?: object
// }

type MetaType = {
  tagName: string,
  props: PropsType
}

// Нельзя создавать экземпляр данного класса
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element : HTMLElement;
  private _meta : MetaType;
  _id = nanoid(6);

  eventBus: () => EventBus<string, Record<string, unknown[]>>;
  children : ChildrenType<Block>;
  props: PropsType;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  // constructor(tagName = "div", propsWithChildren = {} as PropsWithChildrenType<Block>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(tagName = "div", propsWithChildren = {} as PropsWithChildrenType<Block>) {
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
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props.className === "string") {
      const classes = props.className.split(" ");
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === "object") {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element.setAttribute(attrName, attrValue as string);
      });
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsAndChildren : PropsWithChildrenType<Block>) {
    const children = {} as ChildrenType<Block>;
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

  componentDidMount() {}

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
  componentDidUpdate(oldProps : PropsType, newProps : PropsType) {
    // compare props to determin if rerendering is required
    return true;
  }

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

    Object.keys(events).forEach((eventName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._element.addEventListener(eventName, (events as any)[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._element.removeEventListener(eventName, (events as any)[eventName]);
    });
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

    if (this._element.children.length === 0) {
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

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}