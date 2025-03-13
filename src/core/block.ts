import Handlebars from "handlebars";
import { nanoid } from "nanoid";

import { isEqualPlainObjects } from "../utils/utils.ts";
import EventBus from "./eventBus";
import { IChildren } from "./registerComponent.ts";

type EventListType = { [key in keyof HTMLElementEventMap]: (e: Event) => void };

export interface IProps {
  events?: Partial<EventListType>;
  className?: string;
}
class Block<Props extends IProps = IProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CWUM: "flow:component-will-unmount",
  };

  public id = nanoid(6);
  protected props: Props;
  public children: Block<object>[] = [];
  private eventBus: () => EventBus<string, Record<string, Props[]>>;
  private _element: HTMLElement | null = null;

  constructor(props: Props = {} as Props) {
    //const eventBus = new EventBus();
    const eventBus = new EventBus<string, Record<string, Props[]>>();

    this.props = this._makePropsProxy(props, this);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(
        eventName,
        events[eventName as keyof EventListType]!,
      );
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(
        eventName,
        events[eventName as keyof EventListType]!,
      );
    });
  }

  private _registerEvents(eventBus: EventBus<string, Record<string, Props[]>>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWUM, this._componentWillUnmount.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount(),
    );
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
    this._removeEvents();
  }

  protected componentWillUnmount() {
    this._removeEvents();
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqualPlainObjects(oldProps, newProps) || true;
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element?.replaceWith(newElement);
    }

    this._element = newElement;

    if (typeof this.props.className === "string") {
      const classes = this.props.className.split(" ");
      this._element.classList.add(...classes);
    }

    this._addEvents();
  }

  private compile(template: string, context: Props) {
    const contextAndStubs: {
      __children: IChildren<Props>[];
    } & IProps = {
      ...context,
      __children: [],
    };

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    const fragment = temp.content;

    // this.refs = Array.from<HTMLElement>(fragment.querySelectorAll('[ref]')).reduce((list, element) => {
    //     const key = element.getAttribute('ref')!;
    //     (list as {[index: string] : unknown})[key] = element as HTMLElement;
    //     element.removeAttribute('ref');
    //     return list;
    // }, contextAndStubs.__refs as Refs);

    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(fragment);
    });

    return fragment;
  }

  protected render(): string {
    return "";
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: Props, self: Block<Props>) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof Props];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop as keyof Props] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  public hide() {}

  public show() {
    const app = document.getElementById("app");

    if (!app?.firstElementChild) {
      app?.append(document.createElement("div"));
    }

    const htmlElement = this.getContent();
    if (htmlElement && app?.firstElementChild) {
      app?.firstElementChild?.replaceWith(htmlElement);
    }
  }
}

export default Block;
