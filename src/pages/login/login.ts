import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../../components";
import { InputField } from "../../components/input";
import { Validator } from "../../core/utils/validation";

export type LoginPageParams = {
  loginValidator: Validator<string>;
  passwordValidator: Validator<string>;
};

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (props?.errors as any)?.login ?? "",
        inputValidator: props?.loginValidator,
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
              const error = props?.loginValidator.validate(value);
              console.log(`value=${value}, error=${error}`);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (props?.errors as any)?.password ?? "",
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
              console.log(`value=${value}, error=${error}`);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loginError: props?.loginValidator.validate( (this.props?.formState as any).login),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            passwordError: props?.passwordValidator.validate( (this.props?.formState as any).password)
          })}`);
          e.preventDefault();
        }
      }),
      SignUpButton: new Button({
        className: "button button__primary",
        label: "Sign up",
        onClick: (e: MouseEvent) => {
          console.log(`SignUpButton formState = ${JSON.stringify(this.props?.formState)}`);
          console.log(`SignUpButton errors = ${ JSON.stringify({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loginError: props?.loginValidator.validate( (this.props?.formState as any).login),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            passwordError: props?.passwordValidator.validate( (this.props?.formState as any).password)
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
