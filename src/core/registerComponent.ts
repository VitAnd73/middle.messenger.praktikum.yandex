import Block from "./block";
import { Class } from "../types/generics";
import Handlebars from "handlebars";
import { HelperOptions } from "handlebars";

export interface IChildren<Props extends object> {
  component: Block<Props>;
  embed: (fragment: DocumentFragment) => void;
}

export function registerComponent<Props extends object>(
  name: string,
  Component: Class<Block<Props>>,
) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(
    name,
    function (this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);

      const dataAttribute = `data-id="${component.id}"`;

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(fragment: DocumentFragment) {
          const stub = fragment.querySelector(`[${dataAttribute}]`);

          if (!stub) {
            return;
          }

          component.getContent()?.append(...Array.from(stub.childNodes));

          stub.replaceWith(component.getContent()!);
        },
      });

      const contents = fn ? fn(this) : "";

      return `<div ${dataAttribute}>${contents}</div>`;
    },
  );
}
