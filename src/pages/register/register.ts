import { Block, PropsWithChildrenType } from "../../core";
import { emailValidator, first_nameValidator, loginValidator, passwordValidator, phoneValidator, second_nameValidator } from "../../core/utils/validators";

import { Button } from "../../components";
import InputField from "../../components/input/inputField";

const registerStateInitial = {
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  phone: "",
  password: "",
  password1: "",
}

type RegisterState = typeof registerStateInitial;

const fields = [
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
  },
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
];

const buttons = [
  {
    className: "button button__primary",
    label: "Зарегистрироваться",
  },
  {
    className: "button",
    label: "Войти",
    type: "link",
  },

]

export default class RegisterPage extends Block  {
    constructor(props?: PropsWithChildrenType) {
      super("main", {
        ...props,
        formState: registerStateInitial,
        errors: registerStateInitial,

        InputFields: fields.map(inputField => new InputField({
          label: inputField.label,
          error: (props?.errors && (props?.errors as RegisterState)[inputField.name as keyof RegisterState]) ?? "",
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
          type: button.type,
          onClick: (e: MouseEvent) => {
            console.log(`Entered login form: ${JSON.stringify(this.props?.formState)}`);
            const errs = fields.reduce( (a, v) => ({...a, [v.name] : v.validator.validate( (this.props?.formState as RegisterState)[v.name as keyof RegisterState])}), {});
            console.log(`${button.label} clicked - errors = ${ JSON.stringify(errs)}`);
            e.preventDefault();
          }
        })),
      });
        console.log(`curProps = ${props?.errMessage}`);
    }

    public render(): string {
        return `
          <main class="main__register">
            <form class="register-form">
                <h1 class="register__title">Регистрация</h1>
                {{#each InputFields}}
                  {{{this}}}
                {{/each}}
                {{#each Buttons}}
                  {{{this}}}
                {{/each}}
            </form>
        </main>
        `;
      }
}
