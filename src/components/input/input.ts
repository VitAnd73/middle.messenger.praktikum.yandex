import Block, { PropsWithChildrenType } from "../../core/block";

export type InputProps = {
    attrs?: object;
    events?: {
        change?: (e: InputEvent) => void;
        blur?: (e: InputEvent) => void;
    };
} & PropsWithChildrenType;

export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {
            ...props,
        });
    }
}
