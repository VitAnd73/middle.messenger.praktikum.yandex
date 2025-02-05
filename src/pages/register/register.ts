import { Block } from "../../core";

export type RegisterPageParams = {
    errMessage: string;
    validatorRegister: () => boolean;
};

export default class RegisterPage extends Block  {
    constructor(props?: RegisterPageParams) {
      super("main", {
        ...props,
      });
        console.log(`curProps = ${props?.errMessage}`);
    }

    public render(): string {
        return `
          <main class="main__register">
            <form class="register-form">
                <h1 class="register__title">Регистрация</h1>
            </form>
        </main>
        `;
      }
}


// {{> Input label="Почта" name="email" type="email"}}
// {{> Input label="Логин" name="login"}}
// {{> Input label="Имя" name="first_name"}}
// {{> Input label="Фамилия" name="second_name" type="password"}}
// {{> Input label="Телефон" name="phone" type="tel" }}
// {{> Input label="Пароль" name="password" type="password"}}
// {{> Input label="Пароль (ещё раз)" name="password1" type="password"}}
// {{> Button label="Зарегистрироваться" type="primary"}}
// {{> Button label="Войти" type="link" }}
