export type Nullable<T> = T | null;

export type Class<T> = new (...args: any[]) => T;

export type Indexed<T = any> = {
  [k in string | symbol]: T;
};

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type PropsWithErrs<T> = { [P in keyof T & string as `${P}Error`]: T[P] };
