import Block, { IProps } from "../../core/block";

import { HTMLInputType } from "../../constants";

interface IInputProps extends IProps {
    name: string;
    value: string;
    type?: HTMLInputType;
    alt?: string;
    placeholder?: string

    onChange?: (e: Event) => void;
    onBlur?: (e: Event) => void;
}


type Ref = {
    input: HTMLInputElement
}

export default class Input extends Block<IInputProps, Ref> {
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
        const {
            className,
            name,
            value,
            type,
            placeholder,
            alt
        } = this.props;
        return `
            <input
                ${className? 'class="'+className : ''}"
                name="${name}"
                placeholder="${placeholder || ''}"
                value="${value}"
                ${type? 'type="'+type : ''}"
                alt="${alt}"
                ref='input'
            >
        `
    }
}
