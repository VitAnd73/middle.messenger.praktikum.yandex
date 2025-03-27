export type Listener<T extends any[] = any[]> = (...args: T) => void;

export default class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, unknown[]>,
> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};

  constructor() {
    this.listeners = {};
  }

  on(event: E, callback: Listener) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  off(event: E, callback: Listener<M[E]>) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (l) => l !== callback,
      );
    } else {
      throw new Error(`Нет события: ${event}`);
    }
  }

  emit(event: E, ...args: M[E]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((l) => l(...args));
    } else {
      // console.log(`No event =  ${event}`);
    }
  }
}
