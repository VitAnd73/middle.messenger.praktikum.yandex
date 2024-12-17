import Block, { PropsWithChildrenType } from "../../core/block";

import Input from "./input";

type InputProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: {
        change?: (e: InputEvent) => void;
        blur?: (e: InputEvent) => void;
    };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} & PropsWithChildrenType;

type InputFieldProps = {
    label: string;
    error?: string;
    inputProps?: InputProps;
} & PropsWithChildrenType;

// const regexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

// first_name, second_name — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
// const regexp = {
//     regexp: new RegExp("^(?=[A-Z])(?=[а-яА-ЯёЁa-zA-Z]*)(?:(?![\\d+ _$&+,:;=?@#|'<>.^*()%!]).)*$"),
//     errMessage: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)!"
// }

// login — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
// const regexp = {
//     regexp: new RegExp("^(?=.{3,20})\\d*[a-zA-Z][a-zA-Z\\d_-]*$"),
//     errMessage: "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)!"
// }

// email — латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
// const regexp = {
//     regexp: new RegExp("^(?!\\d*$)[a-zA-Z0-9-_]{3,20}$"),
//     errMessage: "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)!"
// }

// password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
// const regexp = {
//     regexp: new RegExp("^(?=.*\\d+.*$)(?=.*[A-Z]+.*$).{8,40}$"),
//     errMessage: "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
// }


// phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
// const regexp = {
//     regexp: new RegExp("^\\+?[0-9]{10,15}$"),
//     errMessage: "от 10 до 15 символов, состоит из цифр, может начинается с плюса"
// }

// message — не должно быть пустым.
interface IValidator<T> {
    regexp: RegExp | ((input: T) => boolean);
    errMessage: string
}
const regexp : IValidator<string> = {
    regexp: new RegExp("^.+$"),
    errMessage: "не должно быть пустым"
}

export default class InputField extends Block {
    constructor(props: InputFieldProps) {
        console.log(`InputField props=${JSON.stringify(props)}`);
        super("div", {
            ...props,
            className: "input",
            Input: new Input({...props.inputProps,
                events: {
                    blur: (e: InputEvent) => {
                        const inputElement = e.target as HTMLInputElement;
                        const value = inputElement.value;
                        const noErr = typeof regexp.regexp === "function" ? regexp.regexp(value) : regexp.regexp.test(value);
                        const cur_error =  noErr ? "" : regexp.errMessage;
                        if (cur_error) {
                            inputElement.classList.add("input__error");
                        }
                        else {
                            inputElement.classList.remove("input__error");
                        }
                        // console.log(`value=${value}`);
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
                // className: "input__element",
                // attrs: {
                //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                //     value: (props?.inputProps.attrs as any)?.value,
                //     placeholder: "",
                // }
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
