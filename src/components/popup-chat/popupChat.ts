import Block, { IProps } from "../../core/block";

interface IPopupChatProps extends IProps {
    onAddUserToChatClick: ()=> void,
    onDeleteChatClick: ()=> void,
}

export default class PopupChat extends Block<IPopupChatProps> {
    constructor(props: IPopupChatProps) {
        super({
            ...props,
            onAddUserToChatClick: ()=> {
                props.onAddUserToChatClick();
            },
            onDeleteChatClick: ()=> {
                props.onDeleteChatClick();
            },
        });
    }
    public render(): string {

        return `
            <div>
                <div class="button_container">
                    {{{Button
                        className = "chat__add"
                        onClick = onAddUserToChatClick
                    }}}
                    Добавить пользователя
                </div>
                <div class="button_container">
                    {{{Button
                        className = "chat__add chat__delete"
                        onClick = onDeleteChatClick
                    }}}
                    Удалить чат
                </div>
            </div>
        `
    }
}
