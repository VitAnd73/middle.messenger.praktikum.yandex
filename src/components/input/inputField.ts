import Block, { PropsWithChildrenType } from "../../core/block";
import Input, {InputProps} from "./input";

import Validator from "../../core/utils/validator";

type InputFieldProps<T> = {
    label: string;
    inputProps: InputProps;
    inputValidator?: Validator<T>
} & PropsWithChildrenType;

export default class InputField<T> extends Block {
    constructor(props: InputFieldProps<T>) {
        super("div", {
            ...props,
            className: "input",
            Input: new Input({...props.inputProps,
                events: {
                    blur: (e: InputEvent) => {
                        const inputElement = e.target as HTMLInputElement;
                        const value = inputElement.value as T;
                        const validator = props?.inputValidator;
                        const cur_error = validator?.validate(value);
                        if (cur_error) {
                            inputElement.classList.add("input__error");
                        }
                        else {
                            inputElement.classList.remove("input__error");
                        }
                        this.setProps({
                            ...this.props,
                            error: cur_error
                        });
                        const curBlur = props.inputProps?.events?.blur;
                        if (curBlur){
                            curBlur(e);
                        }
                    }
                }
            }),
        });
    }
    render(): string {
        return `
            <label class="input__container">
                {{{Input}}}
                <span class="input__label {{#if error}} input__error {{/if}}">{{label}}</span>
            </label>
            {{#if error}}<div class="input__error ">{{error}}</div>{{/if}}
        `
    }
}
