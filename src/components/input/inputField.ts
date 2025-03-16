import Block, { IProps } from "../../core/block";

import { HTMLInputType } from "../../constants";
import Validator from "../../utils/validator";

export interface IInputFieldProps extends IProps {
  name: string;
  label: string;
  placeholder: string;
  type: HTMLInputType;

  inputValidator?: Validator<string>;
  error?: string;
  value?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  inputClassName?: string;
}

export default class InputField extends Block<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return `
            <div>
                <label class="input__container">
                    {{{Input
                        onChange=onChange
                        onBlur=onBlur
                        name=name
                        className=inputClassName
                        type=type
                        placeholder = placeholder
                        value = value
                    }}}
                    <span class="input__label {{#if error}} input__error {{/if}}">{{label}}</span>
                </label>
                {{#if error}}<div class="input__error ">{{error}}</div>{{/if}}
            </div>
        `;
  }
}
