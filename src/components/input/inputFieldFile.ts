import Block, { IProps } from "../../core/block";

import { HTMLInputType } from "../../constants";
import Validator from "../../utils/validator";

export interface IInputFieldFileProps extends IProps {
  name: string;
  label: string;
  placeholder: string;
  type: HTMLInputType;

  inputValidator?: Validator<string>;
  error?: string;
  value?: string;
  onChange?: (e: Event) => void;
  inputClassName?: string;
}

export default class InputFieldFile extends Block<IInputFieldFileProps> {
  constructor(props: IInputFieldFileProps) {
    super({
      ...props,
      onChange: (e: Event) => {
        if (props?.onChange) props?.onChange(e);
      },
    });
  }

  render(): string {
    return `
            <div>
                <label
                  for='file-avatar'
                  class='change-avatar__label'
                  >
                  {{{label}}}
                </label>
                {{{Input
                  id ='file-avatar'
                  className='change-avatar__input'
                  type='file'
                  accept='.jpg, .png, .svg'
                  onChange = onChange
                }}}
            </div>
        `;
  }
}
