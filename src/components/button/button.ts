import Block, { IProps } from "../../core/block";

interface IButtonProps extends IProps {
    label: string,
    onClick?: (e: Event) => void,
    disabled?: boolean;
}

export default class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {
        const { label, disabled } = this.props;
        return `
            <button ${disabled ? "disabled" : ""}>
                ${label? label : ''}
            </button>
        `;
    }
}
