import Block, { PropsWithChildrenType } from "../../core/block";

export default class Img extends Block {
    constructor(props: PropsWithChildrenType) {
        super("img", {
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {
        return `
        `
    }
}
