import Block, { PropsWithChildrenType } from "../../core/block";
import { createChat, getChats } from "../../services/chat";

import { Button } from "../button";
import InputField from "../input/inputField";

type PopupChatListProps = {
    onOkClick: ()=> void,
    onCancelClick: ()=> void,
    chatTitle?: string
}

export default class PopupChatList extends Block {
    constructor(props: PopupChatListProps & PropsWithChildrenType) {
        super("div", {
            ...props,
            chatTitle: "",
            ChatTitleField: new InputField({
                label: "Title нового чата",
                inputProps: {
                    className: "input__element",
                    attrs: {
                        name: "chatTitle",
                        placeholder: "",
                    },
                    events: {
                        blur: (e: InputEvent) => {
                            const value = (e.target as HTMLInputElement).value;
                            this.setProps({
                                ...this.props,
                                chatTitle: value,
                            });
                        }
                    }
                }
            }),
            ButtonAddChat: new Button({
                className: "button-addchat",
                label: "Создать чат",
                onClick: () => {
                    console.log(`chat created with props.chatTitle=${this.props.chatTitle}`);
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
                                console.log('create chat:', error)
                            });
                    }
                    props.onOkClick();
                }
            }),
            ButtonCancel: new Button({
                className: "button-cancel",
                label: "Отменить",
                onClick: () => {
                    props.onCancelClick();
                }
            }),
        });
    }
    public render(): string {

        return `
            <div class="popupChatListTitle">
                <p>Создать новый чат</З>
            </div>
            <div>
                {{{ChatTitleField}}}
            </div>
            <div>
                {{{ButtonAddChat}}}
            </div>
            <div>
                {{{ButtonCancel}}}
            </div>
        `
    }
}
