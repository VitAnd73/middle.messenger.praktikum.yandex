import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../../components";
import { InputField } from "../../components/input";
import { Validator } from "../../core/utils/validation";

type LoginPageParams = {
  loginValidator: Validator<string>;
  passwordValidator: Validator<string>;
};

type LoginState = {
  login: string;
  password: string;
}

export default class LoginPage extends Block {
  constructor(props?: LoginPageParams & PropsWithChildrenType) {
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
        error: (props?.errors as LoginState)?.login ?? "",
        inputValidator: props?.loginValidator,
        inputProps: {
          className: "input__element",
          attrs: {
              name: "login",
              placeholder: ""
          },
          events: {
            blur: (e: InputEvent) => {
              const value = (e.target as HTMLInputElement).value;
              const error = props?.loginValidator.validate(value);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  login: value,
                },
                errors: {
                  ...(this.props.errors as object),
                  login: error,
                }
              });
            }
          }
        }
      }),
      PasswordInputField: new InputField({
        label: "Password",
        error: (props?.errors as LoginState)?.password ?? "",
        inputValidator: props?.passwordValidator,
        inputProps: {
          className: "input__element",
          attrs: {
            type: "password",
            name: "password",
            value: "",
            placeholder: ""
          },
          events: {
            blur: (e: InputEvent) => {
              const value = (e.target as HTMLInputElement).value;
              const error = props?.passwordValidator.validate(value);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  password: value,
                },
                errors: {
                  ...(this.props.errors as object),
                  password: error,
                }
              });
            }
          }
        }
      }),
      SignInButton: new Button({
        className: "button button__primary",
        label: "Sign in",
        color: "primary",
        onClick: (e: MouseEvent) => {
          console.log(`SignInButton formState = ${JSON.stringify(this.props?.formState)}`);
          console.log(`SignInButton errors = ${ JSON.stringify({
            loginError: props?.loginValidator.validate( (this.props?.formState as LoginState).login),
            passwordError: props?.passwordValidator.validate( (this.props?.formState as LoginState).password)
          })}`);
          e.preventDefault();
        }
      }),
      SignUpButton: new Button({
        className: "button",
        label: "Sign up",
        onClick: (e: MouseEvent) => {
          console.log(`SignUpButton formState = ${JSON.stringify(this.props?.formState)}`);
          console.log(`SignUpButton errors = ${ JSON.stringify({
            loginError: props?.loginValidator.validate( (this.props?.formState as LoginState).login),
            passwordError: props?.passwordValidator.validate( (this.props?.formState as LoginState).password)
          })}`);
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
