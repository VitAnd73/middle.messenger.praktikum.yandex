import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../../components";
import { InputField } from "../../components/input";

const loginValidator = (login: string, loginValidationErrorMessage: string = "Some error is happened.") => {
  return login.length > 3 ? "" : loginValidationErrorMessage;
}
// const pwdValidator = (pwd: string, pwdValidationErrorMessage: string = "Some error is happened.") => {
//   return pwd.length > 3 ? "" : pwdValidationErrorMessage;
// }

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
      LoginInputField: new InputField({
        label: "Login",
        // attrs: {
        //     class: "input__element",
        // },
        events: {
          change: (e: InputEvent) => {
            const value = (e.target as HTMLInputElement).value;
            console.log(`value=${value}`);
            const error = loginValidator(value);
            (this.children.LoginInputField as Block).setProps({
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
      PasswordInputField: new InputField({
        label: "Password",
        attrs: {
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
        onClick: (e: MouseEvent) => {
          console.log(this.props.formState);
          e.preventDefault();
        }
      }),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
        <h1 class="login__title">Вход</h1>
        {{{ LoginInputField }}}
        {{{ PasswordInputField }}}
        {{{ SignInButton }}}
        {{{ SignUpButton }}}
      </form>
    `;
  }
}
