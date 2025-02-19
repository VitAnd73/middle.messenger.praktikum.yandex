import Block, { PropsWithChildrenType } from "../../core/block";
import { loginValidator, passwordValidator } from "../../utils/validators";

import { Button } from "../../components";
import { InputField } from "../../components/input";

const loginStateInitial = {
  login: "",
  password: ""
}

type LoginState = typeof loginStateInitial;

const fields = [
  {
    name: 'login',
    label: 'Login',
    validator: loginValidator,
    placeholder: "",
  },
  {
    name: 'password',
    type: "password",
    label: 'Password',
    validator: passwordValidator,
    placeholder: "",
  },
];

const buttons = [
  {
    className: "button button__primary",
    label: "Sign in",
    color: "primary"
  },
  {
    className: "button",
    label: "Sign up",
  },

]

export default class LoginPage extends Block {
  constructor(props?: PropsWithChildrenType) {
    super("main", {
      ...props,
      formState: loginStateInitial,
      errors: loginStateInitial,
      className: "main__login",

      InputFields: fields.map(inputField => new InputField({
        label: inputField.label,
        error: (props?.errors && (props?.errors as LoginState)[inputField.name as keyof LoginState]) ?? "",
        inputValidator: inputField.validator,
        inputProps: {
          className: "input__element",
          attrs: {
            name: inputField.name,
            type: inputField.type,
            placeholder: inputField.placeholder,
          },
          events: {
            blur: (e: InputEvent) => {
              const value = (e.target as HTMLInputElement).value;
              const error = inputField.validator.validate(value);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  [inputField.name]: value,
                },
                errors: {
                  ...(this.props.errors as object),
                  [inputField.name]: error,
                }
              });
            }
          }
        }
      })),

      Buttons: buttons.map(button =>new Button({
        className: button.className,
        label: button.label,
        color: button.color,
        onClick: (e: MouseEvent) => {
          console.log(`Entered login form: ${JSON.stringify(this.props?.formState)}`);
          const errs = fields.reduce( (a, v) => ({...a, [v.name] : v.validator.validate( (this.props?.formState as LoginState)[v.name as keyof LoginState])}), {});
          console.log(`${button.label} clicked - errors = ${ JSON.stringify(errs)}`);
          e.preventDefault();
        }
      })),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
        <h1 class="login__title">Вход</h1>
        {{#each InputFields}}
          {{{this}}}
        {{/each}}
        {{#each Buttons}}
          {{{this}}}
        {{/each}}
      </form>
    `;
  }
}
