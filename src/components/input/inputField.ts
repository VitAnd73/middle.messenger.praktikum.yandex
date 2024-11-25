import Block from "../../core/block";

type InputFieldProps = {
    label: string;
    onChange?: (e: InputEvent) => void;
    onBlur?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: object;
};

export default class InputField extends Block {
    constructor(props: InputFieldProps) {
        super("div", {
            ...props,
            className: "input",
            // attrs: {
            //     class: "input__element",
            // }
        });
    }
    render(): string {
        return `
            <label class="input__container">
                <input
                    class="input__element"

                    {{#if placeholder}}
                        placeholder="{{placeholder}}"
                    {{/if}}
                    {{#unless placeholder}}
                        placeholder=""
                    {{/unless}}

                    type="{{type}}"
                    name="{{name}}"
                />
                <span class="input__label">{{label}}</span>
            </label>
        `
    }
}
