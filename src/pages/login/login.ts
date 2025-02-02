import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../../components";
import { IValidator } from "../../core/utils/validation";
import { InputField } from "../../components/input";

export type LoginPageParams = {
  loginValidator: IValidator<string>;
  passwordValidator: IValidator<string>;
};

export default class LoginPage extends Block {
  constructor(props?: LoginPageParams & PropsWithChildrenType) {
    console.log(`curProps = ${props?.err}`);
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
              const noError = typeof props?.loginValidator.regexp === "function" ? props?.loginValidator.regexp(value) : props?.loginValidator.regexp.test(value);
              console.log(`value=${value}, error=${noError ? "no err" : props?.loginValidator.errMessage}`);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  login: value,
                },
                errors: {
                  login: noError,
                  password: "",
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
              const noError = typeof props?.passwordValidator.regexp === "function" ? props?.passwordValidator.regexp(value) : props?.passwordValidator.regexp.test(value);
              console.log(`value=${value}, error=${noError ? "no err" : props?.loginValidator.errMessage}`);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  password: value,
                },
                errors: {
                  login: "",
                  password: noError,
                }
              });
            }
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
