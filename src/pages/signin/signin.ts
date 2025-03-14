import Block, { IProps } from "../../core/block";
import { SignInInput, SignInInputErrors } from "../../types/domain/user";
import { loginValidator, passwordValidator } from "../../utils/validators";

import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";
import { signin } from "../../api/authServices";
import { strOptionalProp } from "../../utils/util-functions";

const fieldsSignIn = [
  {
    name: "login",
    label: "Login",
    validator: loginValidator,
    placeholder: "",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    validator: passwordValidator,
    placeholder: "",
  },
];

type InputArray = typeof fieldsSignIn;
type InputFields = InputArray[number];

interface ISigninProps extends IProps {
  signInFormValuesState: SignInInput;
  signInFormErrsState: SignInInputErrors;
  onSignIn: (e: Event) => void;
  onSignUp: (e: Event) => void;
  inputFields: InputFields[];
  onFieldChange: (e: Event) => void;
}

export default class SigninPage extends Block<ISigninProps> {
  constructor() {
    super({
      className: "main__login",
      signInFormValuesState: {
        login: "",
        password: "",
      },
      signInFormErrsState: {
        loginError: "",
        passwordError: "",
      },

      onSignIn: (e: Event) => {
        const data = this.props?.signInFormValuesState as SignInInput;
        if (Object.values(data).findIndex((value) => value === null) === -1) {
          signin(data)
            .then(() => {
              Router.getRouter().go(RouteStrs.Messenger);
            })
            .catch((error: Error) => {
              if (error.message === "User already in system") {
                alert(`Вы уже авторизованы в системе!`)
                // Router.getRouter().go(RouteStrs.Messenger);
              } else {
                const errorStr =
                  "Чтото пошло не так. Убедитесь что логин / пароль верные!";
                this.setProps({
                  ...this.props,
                  signInFormErrsState: {
                    loginError: errorStr,
                    passwordError: errorStr,
                  } as SignInInputErrors,
                });
              }
            });
        }
        e.preventDefault();
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSignUp: (_e: Event) => {
        Router.getRouter().go(RouteStrs.Signup);
      },
      inputFields: fieldsSignIn as unknown as InputFields[],

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
      signInFormValuesState: {
        ...(this.props.signInFormValuesState as object),
        [name]: value,
      } as SignInInput,
      signInFormErrsState: {
        ...(this.props.signInFormErrsState as object),
        [name + "Error"]: error,
      } as SignInInputErrors,
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
        value="${this.props.signInFormValuesState[f.name as keyof SignInInput]}"
        onChange = onFieldChange
        error = "${this.props.signInFormErrsState[(f.name + "Error") as keyof SignInInputErrors]}"
      }}}
    `,
      )
      .join(" ");

    return `
      <main>
        <form class="login-form">
          <h1 class="login__title">Вход</h1>
          ${curFields}
          {{{Button className="button button__primary" label="Войти" onClick = onSignIn }}}
          {{{Button className="button" label="Зарегистрироваться" onClick = onSignUp }}}
        </form>
      </main>
    `;
  }
}
