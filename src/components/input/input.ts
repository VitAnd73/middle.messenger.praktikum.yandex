import Block, { PropsWithChildrenType } from "../../core/block";

type InputProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events?: any;
}  & PropsWithChildrenType;

export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {
            ...props,
            // attrs: {
            //     placeholder: "",
            //     value: ""
            // },
        });
    }
}
