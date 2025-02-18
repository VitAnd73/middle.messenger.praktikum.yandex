import Validator from "./validator";

// particular validators for forms
export const loginValidator = new Validator<string>(new RegExp("^(?=.{3,20})\\d*[a-zA-Z][a-zA-Z\\d_-]*$"), "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)!" );
export const passwordValidator = new Validator<string>(new RegExp("^(?=.*\\d+.*$)(?=.*[A-Z]+.*$).{8,40}$"), "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра");
export const first_nameValidator = new Validator<string>(new RegExp("^(?=[A-Z])(?=[а-яА-ЯёЁa-zA-Z]*)(?:(?![\\d+ _$&+,:;=?@#|'<>.^*()%!]).)*$"), "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)!");
export const second_nameValidator = new Validator<string>(new RegExp("^(?=[A-Z])(?=[а-яА-ЯёЁa-zA-Z]*)(?:(?![\\d+ _$&+,:;=?@#|'<>.^*()%!]).)*$"), "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)!");
export const emailValidator = new Validator<string>(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"), "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.");

// TODO check validator regex
// export const phoneValidator = new Validator<string>(new RegExp("^((8|\\+7)[- ]?)?((?\\d{3})?[- ]?)?[\\d- ]{7,10}$"), "от 10 до 15 символов, состоит из цифр, может начинается с плюса");
export const phoneValidator = new Validator<string>(new RegExp("^\\+?[0-9]{10,15}$"), "от 10 до 15 символов, состоит из цифр, может начинается с плюса");

// validator for messages
export const messageValidator = new Validator<string>(new RegExp("^.+$"), "не должно быть пустым");
