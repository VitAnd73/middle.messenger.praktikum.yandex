import { Block, PropsWithChildrenType } from "../../core";
import { emailValidator, first_nameValidator, loginValidator, passwordValidator, phoneValidator, second_nameValidator } from "../../utils/validators";

import { Button } from "../../components";
import InputField from "../../components/input/inputField";
import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";
import { SignUpUser } from "../../api/types";
import { signup } from "../../services/auth";

const registerStateInitial = {
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  phone: "",
  password: "",
  password1: "",
}

type SignUpState = typeof registerStateInitial;

export const fieldsProfile = [
  {
    name: 'email',
    type: 'email',
    label: 'Почта',
    validator: emailValidator,
    placeholder: "",

  },
  {
    name: 'login',
    label: 'Login',
    validator: loginValidator,
    placeholder: "",

  },
  {
    name: 'first_name',
    label: 'Имя',
    validator: first_nameValidator,
    placeholder: "",
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    validator: second_nameValidator,
    placeholder: "",
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    validator: phoneValidator,
    placeholder: "",
  }
];

export const fieldsPassword = [
  {
    name: 'password',
    type: "password",
    label: 'Пароль',
    validator: passwordValidator,
    placeholder: "",
  },
  {
    name: 'password1',
    type: "password",
    label: 'Пароль (ещё раз)',
    validator: passwordValidator,
    placeholder: "",
  },
]

const fields = fieldsProfile.concat(fieldsPassword);

export default class SignupPage extends Block  {
  constructor(props?: PropsWithChildrenType) {
    super("main", {
      ...props,
      formState: registerStateInitial,
      errors: registerStateInitial,

      InputFields: fields.map(inputField => new InputField({
        label: inputField.label,
        error: (props?.errors && (props?.errors as SignUpState)[inputField.name as keyof SignUpState]) ?? "",
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

      ButtonSignUp: new Button({
        className: "button button__primary",
        label: "Зарегистрироваться",
        onClick: (e: MouseEvent) => {
          const data = this.props?.formState;
          if (data) {
            console.log(`Entered login data: ${JSON.stringify(data)}`);
            delete data['password1' as keyof typeof data];
            signup(data as SignUpUser)
              .then(()=> {
                Router.getRouter().go(RouteStrs.Messenger);
              });
          }
          e.preventDefault();
        }
      }),
      ButtonSignIn: new Button({
        className: "button",
        label: "Войти",
        type: "link",
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          Router.getRouter().go(RouteStrs.Signin);
        }
      }),

    });
  }

  public render(): string {
    return `
      <main class="main__register">
        <form class="register-form">
            <h1 class="register__title">Регистрация</h1>
            {{#each InputFields}}
              {{{this}}}
            {{/each}}
            {{{ButtonSignUp}}}
            {{{ButtonSignIn}}}
        </form>
      </main>
    `;
  }
}
