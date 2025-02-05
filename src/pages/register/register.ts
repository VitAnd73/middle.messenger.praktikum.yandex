export type RegisterPageParams = {
    errMessage: string;
    validatorRegister: () => boolean;
};

export default class RegisterPage extends Block  {
    constructor(props?: RegisterPageParams) {
        console.log(`curProps = ${props?.errMessage}`);
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
