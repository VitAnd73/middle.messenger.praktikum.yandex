import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../../components";
import { InputField } from "../../components/input";
import { Validator } from "../../core/utils/validation";

export type LoginPageParams = {
  loginValidator: Validator<string>;
  passwordValidator: Validator<string>;
};

type LoginState = {
  login: string;
  password: string;
}

const big_data = [
  {
      name: "users1",
      details: [
          {username: "alan1", firstName: "Alan", lastName: "Johnson", email: "alan@test.com" },
          {username: "allison1", firstName: "Allison", lastName: "House", email: "allison@test.com" },
          {username: "ryan1", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
        ]
  },
  {
      name: "users2",
      details: [
          {username: "alan2", firstName: "Alan", lastName: "Johnson", email: "alan@test.com" },
          {username: "allison2", firstName: "Allison", lastName: "House", email: "allison@test.com" },
          {username: "ryan2", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
        ]
  }
];

const ifs1 = new InputField({
  label: "Password",
  error: "",
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
        console.log(`value=${value}`);
      }
    }
  }
})
const ifs2 = new InputField({
  label: "Password",
  error: "",
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
        console.log(`value=${value}`);
      }
    }
  }
})

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
        className: "button button__primary",
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

      big_data: [ifs1, ifs2]
      // big_data: big_data
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
        <br/>
        {{big_data}}
      </form>
    `;
  }
}
