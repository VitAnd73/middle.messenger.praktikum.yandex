import Block, { PropsWithChildrenType } from "../../core/block";
import { updatePassword, updateProfile } from "../../services/users";

import { AvatarImg } from "../../components/avatar-image";
import { Button } from "../../components";
import { ChangePasswordInput } from "../../api/types";
import { InputField } from "../../components/input";
import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";
import { User } from "../../models/types";
import { fieldsProfile } from "../signup/signup";
import { logout } from "../../services/auth";
import { makeCamelFromSnake } from "../../utils/utils";
import { passwordValidator } from "../../utils/validators";

const profileFormStatuses =  ["display", "changing-avatar", "changing-data", "changing-pwd"] as const;
type StatusTuple = typeof profileFormStatuses;
type ProfileFormStatus = StatusTuple[number];

const fieldsPassword = [
  {
    name: 'oldPassword',
    type: "password",
    label: 'Старый пароль',
    validator: passwordValidator,
    placeholder: "",
  },
  {
    name: 'newPassword',
    type: "password",
    label: 'Новый пароль',
    validator: passwordValidator,
    placeholder: "",
  },
  {
    name: 'repeatPassword',
    type: "password",
    label: 'Пароль (ещё раз)',
    validator: passwordValidator,
    placeholder: "",
  },
];

const profileFormInitialDisplay = {
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  phone: "",
}

const profileFormInitialChangingPwd = {
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
}

type ProfileFormInitialDisplayType = typeof profileFormInitialDisplay;
type ProfileFormInitialChangingPwdType = typeof profileFormInitialChangingPwd;
type ProfileFormState = Partial<ProfileFormInitialDisplayType | ProfileFormInitialChangingPwdType>;

type ProfilePageFormState = {
  avatar: string,
  status: ProfileFormStatus,
  formState?: ProfileFormState;
}

export default class ProfilePage extends Block {
  constructor(props?: ProfilePageFormState & PropsWithChildrenType) {

    const curUser = window.store.getState().user;
    super("main", {
      ...props,
      user: curUser,
      formState: curUser,

      ProfileInputFields: fieldsProfile.map(inputField => new InputField({
        label: inputField.label,
        inputValidator: inputField.validator,
        inputProps: {
          className: "input__element",
          attrs: {
            name: inputField.name,
            value: curUser![makeCamelFromSnake(inputField.name) as keyof typeof curUser],
            type: inputField.type,
            placeholder: props?.formState ?  props?.formState[inputField.name as keyof ProfileFormState] : inputField.placeholder,
          },
          events: {
            blur: (e: InputEvent) => {
              const value = (e.target as HTMLInputElement).value;
              const error = inputField.validator.validate(value);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  [makeCamelFromSnake(inputField.name)]: value,
                },
                errors: {
                  ...(this.props.errors as object),
                  [makeCamelFromSnake(inputField.name)]: error,
                }
              });
            }
          }
        }
      })),
      PwdInputFields: fieldsPassword.map(inputField => new InputField({
        label: inputField.label,
        inputValidator: inputField.validator,
        inputProps: {
          className: "input__element",
          attrs: {
            name: inputField.name,
            type: inputField.type,
            placeholder: inputField.placeholder,
          },
          events: {
            blur: (e: InputEvent) => {
              const value = (e.target as HTMLInputElement).value;
              const error = inputField.validator.validate(value);
              this.setProps({
                ...this.props,
                formState: {
                  ...(this.props.formState as object),
                  [inputField.name]: value,
                },
                errors: {
                  ...(this.props.errors as object),
                  [inputField.name]: error,
                }
              });
            }
          }
        }
      })),

      ButtonBack: new Button({
        className: "button-back",
        onClick: (e: MouseEvent) => {
          window.location.href = '/';
          e.preventDefault();
        }
      }),

      ButtonsDisplay: [
        new Button({
          className: "button button__link",
          label: "Изменить данные",
          onClick: (e: MouseEvent) => {
            this.setProps({
              ...this.props,
              status: "changing-data",
            });
            e.preventDefault();
          }
        }),
        new Button({
          className: "button button__link",
          label: "Изменить пароль",
          onClick: (e: MouseEvent) => {
            this.setProps({
              ...this.props,
              status: "changing-pwd",
            });
            e.preventDefault();
          }
        }),
        new Button({
          className: "button button__link button__danger",
          label: "Выйти",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            logout()
              .then(() => {
                  Router.getRouter().go(RouteStrs.Signin)
              })
              .catch((error) => console.log(`Err happened while logout: ${error}`));
          }
        })
      ],

      ButtonSave: new Button({
        className: "button button__primary",
        label: "Сохранить",
        onClick: (e: MouseEvent) => {
          console.log(`ProfilePage clicked with form values =${JSON.stringify(this.props?.formState)}`);
          const currentFields = this.props.status === "changing-data" ? fieldsProfile : fieldsPassword;
          const errs = currentFields.reduce( (a, v) => ({...a, [v.name] : v.validator.validate( (this.props?.formState as ProfileFormState)[v.name as keyof ProfileFormState])}), {});
          console.log(`ProfilePage clicked - errors = ${ JSON.stringify(errs)}`);
          e.preventDefault();

          if (this.props.status === "changing-data") {
            const data = this.props?.formState as User;
            if (data) {
              updateProfile(data)
                  .then(() => this.setProps({
                    ...this.props,
                    status: "display",
                  }))
                  .catch((error) => console.log('error in updating profile:', error));
            }
          }
          if (this.props.status === "changing-pwd") {
            const data = {
              oldPassword: this.props?.formState!['oldPassword' as keyof ProfileFormState],
              newPassword: this.props?.formState!['newPassword' as keyof ProfileFormState],
            } as ChangePasswordInput;

            if (data) {
              updatePassword(data)
                  .then(() => this.setProps({
                    ...this.props,
                    status: "display",
                  }))
                  .catch((error) => alert(`Чтото пошло не так! Ошибка - ${error}`));
            }
          }
        }
      }),

      ButtonChangeAvatar: new Button({
        className: "button button__primary avatar_upload",
        label: "Поменять",
        onClick: (e: MouseEvent) => {
          this.setProps({
            ...this.props,
            status: "display"
          });
          e.preventDefault();
        }
      }),

      ButtonAvatarUpload: new Button({
        className: "button button__link avatar_upload",
        label: "Выбрать файл на компьютере",
        onClick: (e: MouseEvent) => {
          console.log(`Выбрать файл на компьютере`);
          e.preventDefault();
        }
      }),

      AvatarImg: new AvatarImg({
        className: "avatar__container",
        avatarSrc: props?.avatar,
        onClick: (e: MouseEvent) => {
          this.setProps({
            ...this.props,
            status: "changing-avatar",
          });
          e.preventDefault();
        },
      })

    });
  }
  public render(): string {
    const isChangingAvatar = this.props.status === "changing-avatar";
    const isChangingData = (this.props.status === "changing-data" || this.props.status ===  "changing-pwd");
    return `
      <div class="container">
          <div class="sider">
              {{{ ButtonBack }}}
          </div>
          <section>
              {{{ AvatarImg }}}
              <h1 class="profile__title">Иван</h1>
              <form class="profile-form" ${this.props.status=="display" && "inert"} >
                {{#each ${this.props.status=="changing-pwd" ? "PwdInputFields" : "ProfileInputFields"}}}
                  {{{this}}}
                {{/each}}
                ${isChangingData ? `
                  <div>
                    {{{ButtonSave}}}
                  </div>
                ` : ""}
              </form>
              ${!isChangingData ? `
                <div>
                  {{#each ButtonsDisplay}}
                    {{{this}}}
                  {{/each}}
                </div>
              ` : ""}
          </section>
          ${isChangingAvatar ? `
          <div class="modal">
            <div class="modal-content">
              <h1 class="modal__title">Загрузите файл</h1>
              {{{ButtonAvatarUpload}}}
              {{{ButtonChangeAvatar}}}
            </div>
          </div>
          ` : ""}
      </div>
    `


  }
}
