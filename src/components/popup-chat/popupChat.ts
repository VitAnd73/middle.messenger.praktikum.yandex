import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../button";

type PopupChatProps = {
    onAddClick: ()=> void,
    onDeleteClick: ()=> void,
}

export default class PopupChat extends Block {
    constructor(props: PopupChatProps & PropsWithChildrenType) {
        super("div", {
            ...props,
            ButtonAddUser: new Button({
                className: "chat__add",
                onClick: () => {
                    props.onAddClick();
                }
            }),
            ButtonDeleteChat: new Button({
                className: "chat__add chat__delete",
                onClick: () => {
                    props.onDeleteClick();
                }
            }),
        });
    }
    public render(): string {

        return `
            <div class="button_container">
                {{{ButtonAddUser}}} Добавить пользователя
            </div>
            <div class="button_container">
                {{{ButtonDeleteChat}}} Удалить чат
            </div>
        `
    }
}
