type ValidationFunc<T> = (input: T) => boolean;
export type ValidatorFunc<T> = T extends string ? (RegExp | ValidationFunc<T>) : ValidationFunc<T>;
export default class Validator<T> {
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
