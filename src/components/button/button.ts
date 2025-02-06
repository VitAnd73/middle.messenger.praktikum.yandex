import Block, { PropsWithChildrenType } from "../../core/block";

export default class Button extends Block {
    constructor(props: PropsWithChildrenType) {
        console.log(`Button constructor`);
        super("button", {
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {
        console.log(`Button render`);
        return `
            {{label}}
        `
    }
}
