import Block, { IProps } from "../../core/block";

interface IAvatarProps extends IProps {
  avatarSrc: string;
  onClick?: () => void;
}

export default class AvatarImg extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    const { avatarSrc } = this.props;
    return `
            <div class="avatar__container">
                <img src="${avatarSrc}" alt="Avatar" class="avatar">
                <div class="avatar__overlay">
                    <div class="avatar__text">Поменять аватар</div>
                </div>
            </div>
        `;
  }
}
