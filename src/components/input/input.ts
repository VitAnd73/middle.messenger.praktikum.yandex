import Block from "../../core/block";

type InputProps = {
    onChange?: (e: InputEvent) => void;
    onBlur?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: any;
};

export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {...props});
    }
}
