import Block, { IProps } from "../../core/block";
import { createChat, getChats } from "../../services/chat";

interface IPopupAddChatProps extends IProps {
    chatTitle?: string;
    onOkClick: ()=> void;
    onCancelClick: ()=> void;
    onTitleChange?: (e: Event) => void;
}

export default class PopupAddChat extends Block<IPopupAddChatProps> {
    constructor(props: IPopupAddChatProps) {
        super({
            ...props,
            chatTitle: "",

            onTitleChange: (e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                this.setProps({
                    ...this.props,
                    chatTitle: value,
                });
            },
            onOkClick: () => {
                const title = this.props.chatTitle as string;
                if (title !== null) {
                    createChat(title)
                        .then(() => {
                            getChats({})
                                .then()
                                .catch((error) => console.log('create chat:', error));
                        })
                        .catch((error) => {
                            alert(`error in creating a chat: ${error}`);
                            console.log('create chat error:', error)
                        });
                }
                props.onOkClick();
            },
            onCancelClick: ()=> {
                props.onCancelClick();
            }
        });
    }

    public render(): string {
        return `<div >
            <div class="popupAddChatTitle">
                <p>Создать новый чат</p>
            </div>
            <div>
                {{{InputField
                    label = "Title нового чата"
                    inputClassName = "input__element"
                    name = "chatTitle"
                    placeholder = " "
                    value = chatTitle
                    onChange = onTitleChange
                }}}
            </div>
            <div>
                {{{Button
                    className = "button-addchat"
                    label = "Создать чат"
                    onClick = onOkClick
                }}}
            </div>
            <div>
                {{{Button
                    className = "button-cancel"
                    label = "Отменить"
                    onClick = onCancelClick
                }}}
            </div>
        </div>`;
    }
}
