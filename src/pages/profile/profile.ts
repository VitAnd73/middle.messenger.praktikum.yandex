import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../../components";

const profileFormStatuses =  ["display", "changing-avatar", "changing-data", "changing-pwd"] as const;
type StatusTuple = typeof profileFormStatuses;
type ProfileFormStatus = StatusTuple[number];

const profileFormInitialDisplay = {
  avatar: "",
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  display_name: "",
  phone: "",
}

// const profileFormInitialChangingPwd = {
//   oldPassword: "",
//   newPassword: "",
//   repeatPassword: "",
// }

// const profileFormInitialChanngingAvatar = {
//   status: 'changing-avatar' as ProfileFormStatus,
// }

// const profileFormInitialChangingData = {
//   ...profileFormInitialDisplay,
//   status: 'changing-data' as ProfileFormStatus,
// }

type ProfilePageFormState = {
  status: ProfileFormStatus,
  formState: Partial<typeof profileFormInitialDisplay>;
}

export default class ProfilePage extends Block {
  constructor(props?: ProfilePageFormState & PropsWithChildrenType) {
    super("main", {
      ...props,
      Button: new Button({
        className: "button button__primary",
        label: props?.status,
        onClick: (e: MouseEvent) => {
          console.log(`ProfilePage clicked with props?.status=${this.props?.status}`);
          const ind = Math.floor(Math.random() * profileFormStatuses.length);
          const newStatus = profileFormStatuses[ind];
          console.log(`ProfilePage changing status to =${newStatus}`);
          this.setProps({
            ...this.props,
            status: newStatus,
            label: newStatus
          });

          e.preventDefault();
        }
      }),
    });
  }
  public render(): string {
    // TBC
    console.log(`Профиль render`);
    const {Button} = this.children;
    if (!Array.isArray(Button)) {
      Button.setProps({
        ...this.props,
        label: this.props.status
      });
    }

    return `
      <form class="login-form">
        <h1 class="login__title">Профиль - ${this.props?.status}</h1>
        {{{ Button }}}
        {{{status}}}
      </form>
    `;
  }
}
