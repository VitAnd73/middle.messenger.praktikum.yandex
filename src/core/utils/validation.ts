export interface IValidator<T> {
    regexp: RegExp | ((input: T) => boolean);
    errMessage: string
}
