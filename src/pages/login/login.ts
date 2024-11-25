import Block, { PropsWithChildrenType } from "../../core/block";
import { Button, Input } from "../../components";

export default class LoginPage extends Block {
  constructor(props?: PropsWithChildrenType<Block>) {
    super("main", {
      ...props,
      formState: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      className: "main__login",
      InputLogin: new Input({
        label: "Login",
        attrs: {
            class: "input__element",
        },
        // onChange: (e: InputEvent) => {
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            change: (e: any) => {
              const value = (e.target as HTMLInputElement).value;
              console.log(`value=${value}`);
              const error = value.length === "error" ? "Some error is happened." : "";
              (this.children.InputLogin as Block).setProps({
                error,
              });
              if (!error) {
                return;
              }
              this.setProps({
                formState: {
                  ...(this.props.formState as object),
                  login: value,
                },
              });
            },
          }
      }),
      InputPassword: new Input({
        label: "Password",
        attrs: {
          class: "input__element",
          type: "password",
          name: "password"
        }
      }),
      SignInButton: new Button({
        className: "button button__primary",
        label: "Sign in",
        color: "primary"
      }),
      SignUpButton: new Button({
        className: "button button__primary",
        label: "Sign up",
        onClick: () => console.log(this.props.formState),
      }),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
        <h1 class="login__title">Вход</h1>
        {{{ InputLogin }}}
        {{{ InputPassword }}}
        {{{ SignInButton }}}
        {{{ SignUpButton }}}
      </form>
    `;
  }
}
