import Block from "../../core/block";

type InputProps = {
    label: string;
    // onChange?: (e: InputEvent) => void;
    // onBlur?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: any;
};

export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {
            ...props,
            // attrs: {
            //     class: "input__element",
            // }
        });
    }
    // render(): string {
    //     return `
    //         <label class="input__container">
    //             <input
    //                 class="input__element"

    //                 {{#if placeholder}}
    //                     placeholder="{{placeholder}}"
    //                 {{/if}}
    //                 {{#unless placeholder}}
    //                     placeholder=""
    //                 {{/unless}}

    //                 type="{{type}}"
    //                 name="{{name}}"
    //             />
    //             <span class="input__label">{{label}}</span>
    //         </label>
    //     `
    // }
}