import Block, { PropsWithChildrenType } from "../../core/block";

import { Chat } from "../../models/Chat";
import { StoreEvents } from "../../core/store/store";

type ChatListItemProps = {
    chat: Chat;
    isSelected?: boolean;
}

export default class ChatListItem extends Block {
    constructor(props: ChatListItemProps & PropsWithChildrenType) {
        window.store.on(StoreEvents.Updated, () => this.setProps({
            ...this.props,
            isSelected: window.store.getState().currentChatID === (this.props.chat as Chat).id,
        }));
        super("div", {
            ...props,
            className: "parent",
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
        const isSelected = this.props.isSelected;
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
            <hr class="nav_divider">
            <div class="${isSelectedClass}">
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
        `
    }
}
