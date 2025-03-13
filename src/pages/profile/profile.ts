import Block, { IProps } from "../../core/block";
import { ChangePasswordInput, User } from "../../types/user";
import { updatePassword, updateProfile } from "../../services/users";
import { PropsWithErrs } from "../../utils/types";
import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";
import { fieldsProfile } from "../signup/signup";
import { logout } from "../../services/auth";
import { passwordValidator } from "../../utils/validators";
import { strOptionalProp } from "../../utils/utils";

type ProfileFormStatus =
  | "display"
  | "changing-avatar"
  | "changing-data"
  | "changing-pwd";

const fieldsPassword = [
  {
    name: "oldPassword",
    type: "password",
    label: "Старый пароль",
    validator: passwordValidator,
    placeholder: "",
  },
  {
    name: "newPassword",
    type: "password",
    label: "Новый пароль",
    validator: passwordValidator,
    placeholder: "",
  },
  {
    name: "repeatPassword",
    type: "password",
    label: "Пароль (ещё раз)",
    validator: passwordValidator,
    placeholder: "",
  },
];

type PwdFormState = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};
type PwdFormStateErrors = PropsWithErrs<PwdFormState>;
type ProfileFormState = Omit<
  User,
  "password" | "display_name" | "avatar" | "id"
>;
type ProfileFormStateErrors = PropsWithErrs<ProfileFormState>;

export interface IProfilePageProps extends IProps {
  avatar?: string;
  user?: User;
  status: ProfileFormStatus;
  profileFormState: ProfileFormState;
  profileFormStateErrors: ProfileFormStateErrors;
  pwdFormState: PwdFormState;
  pwdFormStateErrors: PwdFormStateErrors;
  onBtnBack?: (e: Event) => void;
  onAvatarClick?: (e: Event) => void;
  onBtnAvatarUpload?: (e: Event) => void;
  onBtnChangeAvatar?: (e: Event) => void;
  onBtnChangeData?: (e: Event) => void;
  onBtnChangePwd?: (e: Event) => void;
  onBtnLogout?: (e: Event) => void;
  onBtnSave?: (e: Event) => void;
  onProfileFieldChange?: (e: Event) => void;
  onPwdFieldChange?: (e: Event) => void;
}

export default class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    const curUser = window.store.getState().user!;

    super({
      ...props,
      user: curUser!,
      // #region initial set up of forms' data
      profileFormState: {
        email: curUser?.email,
        login: curUser?.login,
        first_name: curUser?.first_name,
        second_name: curUser?.second_name,
        phone: curUser?.phone,
      },
      profileFormStateErrors: {
        emailError: "",
        loginError: "",
        first_nameError: "",
        second_nameError: "",
        phoneError: "",
      },
      pwdFormState: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      },
      pwdFormStateErrors: {
        oldPasswordError: "",
        newPasswordError: "",
        repeatPasswordError: "",
      },
      // #endregion

      // #region button handlers
      onBtnBack: (e: Event) => {
        Router.getRouter().go(RouteStrs.Navigation);
        e.preventDefault();
      },
      onAvatarClick: (e: Event) => {
        this.setProps({
          ...this.props,
          status: "changing-avatar",
        });
        e.preventDefault();
      },
      onBtnAvatarUpload: (e: Event) => {
        console.log(`Выбрать файл на компьютере`);
        e.preventDefault();
      },
      onBtnChangeData: (e: Event) => {
        this.setProps({
          ...this.props,
          status: "changing-data",
        });
        e.preventDefault();
      },
      onBtnChangePwd: (e: Event) => {
        this.setProps({
          ...this.props,
          status: "changing-pwd",
        });
        e.preventDefault();
      },
      onBtnLogout: (e: Event) => {
        logout()
          .then(() => {
            Router.getRouter().go(RouteStrs.Signin);
          })
          .catch((error) => console.log(`Err happened while logout: ${error}`));
        e.preventDefault();
      },
      onBtnSave: (e: Event) => {
        e.preventDefault();
        if (this.props.status === "changing-data") {
          const data = this.props?.profileFormState as User;
          if (data) {
            updateProfile(data)
              .then(() =>
                this.setProps({
                  ...this.props,
                  status: "display",
                }),
              )
              .catch((error) =>
                console.log("error in updating profile:", error),
              );
          }
        }
        if (this.props.status === "changing-pwd") {
          const data = {
            oldPassword:
              this.props?.pwdFormState!["oldPassword" as keyof PwdFormState],
            newPassword:
              this.props?.pwdFormState!["newPassword" as keyof PwdFormState],
          } as ChangePasswordInput;

          if (data) {
            updatePassword(data)
              .then(() =>
                this.setProps({
                  ...this.props,
                  status: "display",
                }),
              )
              .catch((error) => alert(`Чтото пошло не так! Ошибка - ${error}`));
          }
        }
      },

      onBtnChangeAvatar: (e: Event) => {
        this.setProps({
          ...this.props,
          status: "display",
        });
        e.preventDefault();
      },
      // #endregion

      // #region inputfield change handlers
      onProfileFieldChange: (e: Event) => {
        const elem = e.target as HTMLInputElement;
        const value = elem.value;
        const name = elem.name;
        const fieldSetUp = fieldsProfile.find((i) => i.name === name);
        const error = fieldSetUp?.validator.validate(value);
        this.setProps({
          ...this.props,
          profileFormState: {
            ...(this.props.profileFormState as object),
            [name]: value,
          } as ProfileFormState,
          profileFormStateErrors: {
            ...(this.props.profileFormStateErrors as object),
            [name + "Error"]: error,
          } as ProfileFormStateErrors,
        });
      },

      onPwdFieldChange: (e: Event) => {
        const elem = e.target as HTMLInputElement;
        const value = elem.value;
        const name = elem.name;
        const fieldSetUp = fieldsPassword.find((i) => i.name === name);
        const error = fieldSetUp?.validator.validate(value);
        this.setProps({
          ...this.props,
          pwdFormState: {
            ...(this.props.pwdFormState as object),
            [name]: value,
          } as PwdFormState,
          pwdFormStateErrors: {
            ...(this.props.pwdFormStateErrors as object),
            [name + "Error"]: error,
          } as PwdFormStateErrors,
        });
      },

      // #endregion
    });
  }
  public render(): string {
    const isChangingAvatar = this.props.status === "changing-avatar";
    const isChangingData =
      this.props.status === "changing-data" ||
      this.props.status === "changing-pwd";

    const curProfileInputFields = fieldsProfile
      .map(
        (f) => `
      {{{ InputField
        name="${f.name}"
        ${strOptionalProp("type", f.type)}
        inputClassName="input__element"
        label="${f.label}"
        ${strOptionalProp("placeholder", f.placeholder)}
        value="${this.props.profileFormState[f.name as keyof ProfileFormState]}"
        onChange = onProfileFieldChange
        error = "${this.props.profileFormStateErrors[(f.name + "Error") as keyof ProfileFormStateErrors] ?? ""}"
      }}}
    `,
      )
      .join(" ");
    const curPwdInputFields = fieldsPassword
      .map(
        (f) => `
      {{{ InputField
        name="${f.name}"
        ${strOptionalProp("type", f.type)}
        inputClassName="input__element"
        label="${f.label}"
        ${strOptionalProp("placeholder", f.placeholder)}
        value="${this.props.pwdFormState[f.name as keyof PwdFormState]}"
        onChange = onPwdFieldChange
        error = "${this.props.pwdFormStateErrors[(f.name + "Error") as keyof PwdFormStateErrors] ?? ""}"
      }}}
    `,
      )
      .join(" ");

    return `
      <div class="container">
        <div class="sider">
            {{{ Button
              className = "button-back"
              onClick = onBtnBack
            }}}
        </div>
        <section>
            {{{ AvatarImg
              className = "avatar__container"
              avatarSrc = avatar
              onClick = onAvatarClick
            }}}
            <h1 class="profile__title">${this.props.user?.first_name}</h1>
            <form class="profile-form" ${this.props.status == "display" && "inert"} >
              ${this.props.status == "changing-pwd" ? curPwdInputFields : curProfileInputFields}
              ${
                isChangingData
                  ? `
                <div>
                  {{{Button
                    className = "button button__primary"
                    label = "Сохранить"
                    onClick = onBtnSave
                  }}}
                </div>
              `
                  : ""
              }
            </form>
            ${
              !isChangingData
                ? `
              <div>
                {{{Button
                  className = "button button__link"
                  label = "Изменить данные"
                  onClick = onBtnChangeData
                }}}
                {{{Button
                  className = "button button__link"
                  label = "Изменить пароль"
                  onClick = onBtnChangePwd
                }}}
                {{{Button
                  className = "button button__link button__danger"
                  label = "Выйти"
                  onClick = onBtnLogout
                }}}
              </div>
            `
                : ""
            }
          </section>
          ${
            isChangingAvatar
              ? `
            <div class="modal">
              <div class="modal-content">
                <h1 class="modal__title">Загрузите файл</h1>
                {{{ Button
                    className="button button__link avatar_upload"
                    label="Выбрать файл на компьютере"
                    onClick=onBtnAvatarUpload
                }}}
                {{{Button
                  className = "button button__primary avatar_upload"
                  label = "Поменять"
                  onClick=onBtnChangeAvatar
                }}}
              </div>
            </div>
            `
              : ""
          }
      </div>
    `;
  }
}
