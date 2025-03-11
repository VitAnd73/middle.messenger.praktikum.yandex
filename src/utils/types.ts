export type Nullable<T> = T | null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class<T> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
    [k in (string | symbol)]: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PlainObject<T = any> = {
    [k in string]: T;
};

export type PropsWithErrs<T> = { [P in keyof T & string as `${P}Error`]: T[P] };
