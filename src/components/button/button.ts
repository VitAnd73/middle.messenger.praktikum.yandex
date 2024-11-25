import Block, { PropsWithChildrenType } from "../../core/block";

export default class Button extends Block {
    constructor(props?: PropsWithChildrenType<Block>) {
        super("button", {...props});
    }
    public render(): string {
        return `
            {{label}}
        `
    }
}
