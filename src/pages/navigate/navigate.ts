import Block, { IProps } from "../../core/block";

export default class NavigatePage extends Block<IProps> {
  constructor(props?: IProps) {
    super({
      ...props,
    });
  }
  public render(): string {
    return `
      <main>
        <nav>
            <ul>
                <li><a href="./signin" page="signin">Авторизация</a></li>
                <li><a href="./signup" page="signup">Регистрация</a></li>
                <li><a href="./settings" page="profile">Профиль</a></li>
                <li><a href="./messenger" page="chats">Чат</a></li>
                <li><a href="./500" page="500">500</a></li>
                <li><a href="./404" page="404">404</a></li>
            </ul>
        </nav>
    </main>
    `;
  }
}
