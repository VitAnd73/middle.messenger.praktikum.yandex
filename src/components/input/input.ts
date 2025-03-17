import Block, { IProps } from "../../core/block";

import { HTMLInputType } from "../../constants";

interface IInputProps extends IProps {
  name?: string;
  id?: string;
  value: string;
  type?: HTMLInputType;
  alt?: string;
  placeholder?: string;
  accept? : string;

  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export default class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        change: props.onChange,
        blur: props.onBlur,
      },
    });
  }
  public render(): string {
    const { className, name, value, type, placeholder, alt, id, accept } = this.props;
    return `
            <input
                ${className ? 'class="' + className : ""}"
                ${name ? 'name="' + name : ""}"
                ${id ? 'id="' + id : ""}"
                placeholder="${placeholder || ""}"
                value="${value}"
                ${type ? 'type="' + type : ""}"
                ${accept ? 'accept="' + accept : ""}"
                alt="${alt}"
            >
        `;
  }
}
