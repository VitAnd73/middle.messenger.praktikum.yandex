import { SignUpInput, SignUpInputErrors, User } from "../../types/domain/user";
import {
  emailValidator,
  first_nameValidator,
  loginValidator,
  passwordValidator,
  phoneValidator,
  second_nameValidator,
} from "../../utils/validators";

import { Block } from "../../core";
import { IProps } from "../../core/block";
import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";
import { signup } from "../../api/authServices";
import { strOptionalProp } from "../../utils/util-functions";

export const fieldsProfile = [
  {
    name: "email",
    type: "email",
    label: "Почта",
    validator: emailValidator,
    placeholder: "",
  },
  {
    name: "login",
    label: "Login",
    validator: loginValidator,
    placeholder: "",
  },
  {
    name: "first_name",
    label: "Имя",
    validator: first_nameValidator,
    placeholder: "",
  },
  {
    name: "second_name",
    label: "Фамилия",
    validator: second_nameValidator,
    placeholder: "",
  },
  {
    name: "phone",
    label: "Телефон",
    type: "tel",
    validator: phoneValidator,
    placeholder: "",
  },
];
export const fieldsPassword = [
  {
    name: "password",
    type: "password",
    label: "Пароль",
    validator: passwordValidator,
    placeholder: "",
  },
  {
    name: "password1",
    type: "password",
    label: "Пароль (ещё раз)",
    validator: passwordValidator,
    placeholder: "",
  },
];

const fields = fieldsProfile.concat(fieldsPassword);
type InputArray = typeof fields;
type InputFields = InputArray[number];

interface ISignUpProps extends IProps {
  signUpFormValuesState: SignUpInput;
  signUpFormErrsState: SignUpInputErrors;
  inputFields: InputFields[];
  onSignUp: (e: Event) => void;
  onSignIn: (e: Event) => void;
  onFieldChange: (e: Event) => void;
}

export default class SignupPage extends Block<ISignUpProps> {
  constructor(props?: ISignUpProps) {
    super({
      ...props,
      signUpFormValuesState: {
        login: "",
        password: "",
        email: "",
        first_name: "",
        second_name: "",
        phone: "",
        password1: "",
      },
      signUpFormErrsState: {
        loginError: "",
        passwordError: "",
        emailError: "",
        first_nameError: "",
        second_nameError: "",
        phoneError: "",
        password1Error: "",
      },
      inputFields: fields,
      onSignUp: (e: Event) => {
        const data = this.props?.signUpFormValuesState;
        if (data) {
          delete data["password1" as keyof typeof data];
          signup(data as User).then(() => {
            Router.getRouter().go(RouteStrs.Messenger);
          });
        }
        e.preventDefault();
      },
      onSignIn: (e: Event) => {
        e.preventDefault();
        Router.getRouter().go(RouteStrs.Signin);
      },
      onFieldChange: (e: Event) => this.onFieldChange(e),
    });
  }
  private onFieldChange(e: Event) {
    this.handleField(e);
  }

  private handleField(e: Event) {
    const elem = e.target as HTMLInputElement;
    const value = elem.value;
    const name = elem.name;
    const fieldSetUp = this.props.inputFields.find((i) => i.name === name);
    const error = fieldSetUp?.validator.validate(value);
    this.setProps({
      ...this.props,
      signUpFormValuesState: {
        ...(this.props.signUpFormValuesState as object),
        [name]: value,
      } as SignUpInput,
      signUpFormErrsState: {
        ...(this.props.signUpFormErrsState as object),
        [name + "Error"]: error,
      } as SignUpInputErrors,
    });
  }
  public render(): string {
    const curFields = this.props.inputFields
      .map(
        (f) => `
          {{{ InputField
            name="${f.name}"
            ${strOptionalProp("type", f.type)}
            inputClassName="input__element"
            label="${f.label}"
            ${strOptionalProp("placeholder", f.placeholder)}
            value="${this.props.signUpFormValuesState[f.name as keyof SignUpInput] ?? ""}"
            onChange = onFieldChange
            error = "${this.props.signUpFormErrsState[(f.name + "Error") as keyof SignUpInputErrors] ?? ""}"
          }}}
        `,
      )
      .join(" ");

    return `
      <main class="main__register">
        <form class="register-form">
            <h1 class="register__title">Регистрация</h1>
            ${curFields}
            {{{ Button
              className = "button button__primary"
              label = "Зарегистрироваться"
              onClick = onSignUp
            }}}
            {{{ Button
              className = "button"
              label = "Войти"
              type = "link"
              onClick = onSignIn
            }}}
        </form>
      </main>
    `;
  }
}
