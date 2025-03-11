import Block, { IProps } from "../../core/block";

interface IImgProps extends IProps {
    onClick?: () => void,
}
export default class Img extends Block<IImgProps> {
    constructor(props: IImgProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {
        return `
            <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
        `
    }
}
