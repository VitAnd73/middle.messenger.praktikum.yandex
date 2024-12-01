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
  constructor(props?: PropsWithChildrenType) {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (props?.errors as any)?.login ?? "",
        inputProps: {
          className: "input__element",
          attrs: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name: "login",
              placeholder: ""
          },
          events: {
            blur: (e: InputEvent) => {
              const value = (e.target as HTMLInputElement).value;
              const error = loginValidator(value);
              console.log(`value=${value}`);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  login: value,
                },
                errors: {
                  login: error,
                  password: "",
                }
              });
            }
          }
        }
      }),
      PasswordInputField: new InputField({
        label: "Password",
        inputProps: {
          className: "input__element",
          attrs: {
            type: "password",
            name: "password",
            value: "",
            placeholder: ""
          }
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
