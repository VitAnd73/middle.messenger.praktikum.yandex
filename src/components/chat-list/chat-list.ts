import Block, { PropsWithChildrenType } from "../../core/block";

export default class ChatList extends Block {
    constructor(props: PropsWithChildrenType) {
        super("button", {
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {
        return `
            {{label}}
        `
    }
}
