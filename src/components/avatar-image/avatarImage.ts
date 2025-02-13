import Block, { PropsWithChildrenType } from "../../core/block";

export default class AvatarImg extends Block {
    constructor(props: PropsWithChildrenType) {
        super("div", {
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {
        return `
            <div class="avatar__container">
                <img src="{{{avatarSrc}}}" alt="Avatar" class="avatar">
                <div class="avatar__overlay">
                    <div class="avatar__text">Поменять аватар</div>
                </div>
            </div>
        `
    }
}
