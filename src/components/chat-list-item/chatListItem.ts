import Block, { IProps } from "../../core/block";

import { Chat } from "../../types/chat";

interface IChatListItemProps extends IProps {
    chat: Chat;
}

export default class ChatListItem extends Block<IChatListItemProps> {
    constructor(props: IChatListItemProps & IProps) {
        super({
            ...props,
            events: {
                click: () => {
                    window.store.set({
                        currentChatID: (this.props?.chat as Chat).id
                    });
                },
            },
        });
    }

    public render(): string {
        const chat = this.props.chat as Chat;
        const isSelected = window.store.getState().currentChatID === (this.props.chat as Chat).id;
        const isSelectedClass = isSelected ? "parent__selected" : "parent";
        let lastUserName = "";
        if (chat.last_message) {
            if (chat.last_message.user.login === window.store.getState().user?.login) {
                lastUserName = "Вы: "
            } else {
                lastUserName = chat.last_message.user.first_name + ": "
            }
        }
        const avatarSource = chat.avatar ?? "src/assets/imgs/img_avatar.png";
        return `
            <div class="${isSelectedClass}">
                <hr class="nav_divider">
                <div class="parent">
                    <div class="child">
                        <div class="grand-child one">
                            <img src="${avatarSource}" alt="Avatar" class="item__avatar">
                        </div>
                        <div class="grand-child two">
                            ${chat.title} - ${lastUserName}<br>
                            ${chat.last_message?.content ? chat.last_message.content : "[no messages yet]" }
                        </div>
                        <div class="grand-child three">
                            <div class="grand-child-child">${chat.last_message ? new Date(chat.last_message.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "--:--"}</div>
                            <div class="grand-child-child count">
                                <div class="numberCircle">${chat.unread_count > 0 ? chat.unread_count : "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="nav_divider">
            </div>
        `
    }
}
