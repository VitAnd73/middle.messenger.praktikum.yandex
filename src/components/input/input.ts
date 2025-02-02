import Block, { PropsWithChildrenType } from "../../core/block";

export type InputProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: {
        change?: (e: InputEvent) => void;
        blur?: (e: InputEvent) => void;
    };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} & PropsWithChildrenType;

export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {
            ...props,
        });
    }
}
