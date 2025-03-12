import Block, { IProps } from "../../core/block";

interface IPopupChatProps extends IProps {
    onAddUserToChatItemClick: ()=> void,
    onDeleteChatItemClick: ()=> void,
    onRemoveUserFromChatItemClick: ()=> void,
}

export default class PopupChat extends Block<IPopupChatProps> {
    constructor(props: IPopupChatProps) {
        super({
            ...props,
            onAddUserToChatItemClick: ()=> {
                props.onAddUserToChatItemClick();
            },
            onDeleteChatItemClick: ()=> {
                props.onDeleteChatItemClick();
            },
        });
    }
    public render(): string {

        return `
            <div>
                <div class="button_container">
                    {{{Button
                        className = "chat__add"
                        onClick = onAddUserToChatItemClick
                    }}}
                    Добавить пользователя
                </div>
                <div class="button_container">
                    {{{Button
                        className = "chat__add chat__delete"
                        onClick = onRemoveUserFromChatItemClick
                    }}}
                    Удалить пользователя
                </div>
                <div class="button_container">
                    {{{Button
                        className = "chat__add chat__delete"
                        onClick = onDeleteChatItemClick
                    }}}
                    Удалить чат
                </div>
            </div>
        `
    }
}
