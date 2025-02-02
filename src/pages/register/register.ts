export type RegisterPageParams = {
    errMessage: string;
    validatorRegister: () => boolean;
};

export default class RegisterPage {
    constructor(props?: RegisterPageParams) {
        console.log(`curProps = ${props?.errMessage}`);
    }
}
