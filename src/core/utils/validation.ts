type ValidationFunc<T> = (input: T) => boolean;
export type ValidatorFunc<T> = T extends string ? (RegExp | ValidationFunc<T>) : ValidationFunc<T>;
export class Validator<T> {
    readonly validationFunc: ValidatorFunc<T>;
    readonly errMessage: string;
    constructor (validationFunc: ValidatorFunc<T>, errMessage: string) {
        this.validationFunc = validationFunc;
        this.errMessage = errMessage;
    }

    validate(value: T) : string {
        const noError = typeof this.validationFunc === "function" ? this.validationFunc(value) :
            typeof value === 'string' ? this.validationFunc.test(value) : false;
        return noError ? "" : this.errMessage;
    }
}

// particular validators
export const loginValidator = new Validator<string>(new RegExp("^(?=.{3,20})\\d*[a-zA-Z][a-zA-Z\\d_-]*$"), "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)!" );
export const passwordValidator = new Validator<string>(new RegExp("^(?=.*\\d+.*$)(?=.*[A-Z]+.*$).{8,40}$"), "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра");
