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
    inputProps: InputProps;
} & PropsWithChildrenType;


export default class InputField extends Block {
    constructor(props: InputFieldProps) {
        console.log(`InputField props=${JSON.stringify(props)}`);
        super("div", {
            ...props,
            className: "input",
            Input: new Input({...props.inputProps
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
                <span class="input__label">{{label}}</span>
            </label>
            <div class="input__error ">{{#if error}}{{error}}{{/if}}</div>
        `
    }
}
