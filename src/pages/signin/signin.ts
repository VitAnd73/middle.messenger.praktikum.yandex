import Block, { PropsWithChildrenType } from "../../core/block";
import { loginValidator, passwordValidator } from "../../utils/validators";

import { Button } from "../../components";
import { InputField } from "../../components/input";
import { LoginRequestData } from "../../api/types";
import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";
import { signin } from "../../services/auth";

const signinStateInitial = {
  login: "",
  password: ""
}

type SigninState = typeof signinStateInitial;

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

export default class SigninPage extends Block {
  constructor(props?: PropsWithChildrenType) {
    super("main", {
      ...props,
      formState: signinStateInitial,
      errors: signinStateInitial,
      className: "main__login",

      InputFields: fields.map(inputField => new InputField({
        label: inputField.label,
        error: (props?.errors && (props?.errors as SigninState)[inputField.name as keyof SigninState]) ?? "",
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

      ButtonSignIn: new Button({
        className: "button button__primary",
        label: "Войти",
        color: "primary",
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          const data = this.props?.formState as LoginRequestData;
          if (Object.values(data).findIndex(value => value === null) === -1) {
            console.log(`loging = ${JSON.stringify(data)}`);
            signin(data)
              .then(() => {
                Router.getRouter().go(RouteStrs.Messenger)
              })
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .catch((_error : Error) => {
                const inputBlocks = (this.children.InputFields as Block[]);
                inputBlocks.forEach( ib => ib.setProps({
                  ...ib.props,
                  error: "Чтото пошло не так. Убедитесь что логин / пароль верные!",
                }));
              });
          }
        },
      }),

      ButtonSignUp: new Button({
        className: "button",
        label: "Зарегистрироваться",
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          Router.getRouter().go(RouteStrs.Signup);
        }
      }),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
        <h1 class="login__title">Вход</h1>
        {{#each InputFields}}
          {{{this}}}
        {{/each}}

        {{{ButtonSignIn}}}
        {{{ButtonSignUp}}}

      </form>
    `;
  }
}
