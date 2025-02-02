import Block, { PropsWithChildrenType } from "../../core/block";
import Input, {InputProps} from "./input";

import { IValidator } from "../../core/utils/validation";

type InputFieldProps<T> = {
    label: string;
    inputProps: InputProps;
    inputValidator?: IValidator<T>
} & PropsWithChildrenType;

export default class InputField<T> extends Block {
    constructor(props: InputFieldProps<T>) {
        console.log(`InputField props=${JSON.stringify(props)}`);
        super("div", {
            ...props,
            className: "input",
            Input: new Input({...props.inputProps,
                events: {
                    blur: (e: InputEvent) => {
                        const inputElement = e.target as HTMLInputElement;
                        const value = inputElement.value;
                        const validator = props?.inputValidator as IValidator<string>;
                        const noErr = validator?.regexp ?
                            typeof validator?.regexp === "function" ? validator?.regexp(value) : validator.regexp.test(value) :
                            true;
                        const cur_error =  noErr ? "" : props.inputValidator?.errMessage;
                        if (cur_error) {
                            inputElement.classList.add("input__error");
                        }
                        else {
                            inputElement.classList.remove("input__error");
                        }
                        console.log(`value=${value}`);
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
