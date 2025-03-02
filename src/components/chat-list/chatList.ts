import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../button";
import ChatListItem from "../chat-list-item/chatListItem";
import { PopupChatList } from "../popup-chat-list";
import { StoreEvents } from "../../core/store/store";

// import { Chat } from "../../models/Chat";




// type ChatListProps = {
//     chatList?: Chat[],
//     selectedChatId?: number,
// }

export default class ChatList extends Block {
    constructor(props: PropsWithChildrenType) {
        const chatListItems = window.store.getState().chats.map((chat) => new ChatListItem({
            chat: chat,
        }));
        super("div", {
            ...props,
            ButtonChatList: new Button({
                className: "chatlist__search",
                onClick: () => {
                    const curPopUpState = this.props?.isPopupChatListOpen ?? false;
                    this.setProps({
                        ...this.props,
                        isPopupChatListOpen: !curPopUpState,
                    });
                }
            }),
            PopupChatList: new PopupChatList({
                className: "popupChatList",
                onOkClick: () => {
                    const curPopUpState = this.props?.isPopupChatListOpen ?? false;
                    this.setProps({
                        ...this.props,
                        isPopupChatListOpen: !curPopUpState,
                        chatList: window.store.getState().chats,
                    });
                },
                onCancelClick: () => {
                    const curPopUpState = this.props?.isPopupChatListOpen ?? false;
                    this.setProps({
                        ...this.props,
                        isPopupChatListOpen: !curPopUpState,
                    });
                },
            }),

            ChatListItems: chatListItems,
        });

        window.store.on(StoreEvents.Updated, () => this.setProps({
            ...this.props,
            chatList: window.store.getState().chats,
        }));
    }

    public render(): string {
        return `
            <div class="chatlist__header">
                <input type="text" class="input__search" value placeholder="Поиск" name="search">
                {{{ButtonChatList}}}
            </div>
            <hr class="nav_divider">
            {{#each ChatListItems}}
                {{{this}}}
            {{/each}}
            ${this.props.isPopupChatListOpen ? '{{{PopupChatList}}}' : ''}
        `
    }
}
