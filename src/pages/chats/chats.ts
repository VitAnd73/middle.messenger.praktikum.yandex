import Block, { PropsWithChildrenType } from "../../core/block";
import { Button, Input } from "../../components";
import { deleteChat, getChats } from "../../services/chat";

import { ButtonAttach } from "../../components/button-attach";
import { Chat } from "../../models/Chat";
import { ChatList } from "../../components/chat-list";
import { PopupAttach } from "../../components/popup-attach";
import { PopupChat } from "../../components/popup-chat";
import { StoreEvents } from "../../core/store/store";
import { messageValidator } from "../../utils/validators";

type ChatPageStateType = {
  isPopupChatOpen: boolean,
  isPopupAttachOpen: boolean,
  currentChatID?: number,
  chats?: Chat[],
};

export default class ChatsPage extends Block {
  constructor(props: ChatPageStateType & PropsWithChildrenType) {
      // const curChatList = window.store.getState().chats;
      super("main", {
      ...props,
      ChatList: new ChatList({
        className: "sidenav",
        // chatList: props.chats,
        // chatList: curChatList,
      }),
      PopupChat: new PopupChat({
        className: "popupChat",
        onAddClick: () => {
          console.log(`onAddClick`);
          this.closeChatPopup();

        },
        onDeleteClick: () => {
          const curChatId = window.store.getState().currentChatID;
          if (curChatId) {
            deleteChat(curChatId)
                .then(() => {
                    getChats({})
                        .then()
                        .catch((error) => console.warn('create chat:', error));
                })
                .catch((error) => console.warn('delete chat:', error));
          }
          console.log(`onDeleteClick id = ${window.store.getState().currentChatID}`);
          this.closeChatPopup();
        },
      }),
      PopupAttach: new PopupAttach({
        className: "popup",
      }),
      ButtonChat: new Button({
        className: "button-chat",
        onClick: () => {
          const curPopUpState = this.props?.isPopupChatOpen ?? true;
          this.setProps({
            ...this.props,
            isPopupChatOpen: !curPopUpState,
          });
        }
      }),
      ButtonAttach: new ButtonAttach({
        onClick: () => {
          const curPopUpState = this.props?.isPopupAttachOpen ?? true;
          this.setProps({
            ...this.props,
            isPopupAttachOpen: !(curPopUpState),
          });
        },
      }),
      InputMessage: new Input({
        className: "input__message",
        attrs: {
          placeholder: "Сообщение",
          name: "message",
        },
        events: {
            blur: (e: InputEvent) => {
                const inputElement = e.target as HTMLInputElement;
                const value = inputElement.value;
                const cur_error = messageValidator?.validate(value);
                if (cur_error) {
                    inputElement.classList.add("input__error");
                }
                else {
                    inputElement.classList.remove("input__error");
                }
                this.setProps({
                    ...this.props,
                    chatState: {
                      ...(this.props.chatState as object),
                      messageStr: value,
                      messageErr: cur_error,
                    }
                });
            }
        }
      }),
      ButtonSend: new Button({
        className: "button-send",
        onClick: () => {
          // TODO - add sending to the server
          console.log('asdad');
          // console.log(`Current state: ${JSON.stringify({
          //   message: (this.props.chatState as ChatStateType).messageStr,
          //   err: (this.props.chatState as ChatStateType).messageErr,
          // })}`);
        }
      }),
    });
    window.store.on(StoreEvents.Updated, () => this.handleStoreUpdate());
  }
  private closeChatPopup() {
    this.setProps({
      ...this.props,
      isPopupChatOpen: false,
    });
  }
  private handleStoreUpdate() {
    this.setProps({
      ...this.props,
      currentChatID: window.store.getState().currentChatID,
      chats: window.store.getState().chats
    });
  }
  public render(): string {
    const curState = window.store.getState();
    const curChatId = curState.currentChatID as number;
    const curChat = curState.chats?.find(c => c.id===curChatId);
    const avatarSource = curChat?.avatar ?? "src/assets/imgs/img_avatar.png";

    const numOfChats = window.store.getState().chats.length;
    const numOfChatsProps = (this.props.chats as Chat[])?.length;

    return `
    <main>
      {{{ChatList}}}
      <div class="chat__container">

        window.store numOfChats - ${numOfChats}
        numOfChatsProps numOfChats - ${numOfChatsProps}

        {{#if currentChatID}}
          <div class="chat__header">
            <div class="header__avatar">
              <img src="${avatarSource}" alt="Avatar" class="avatar_img">
            </div>
            <div class="header__author">
              <b>${curChat?.title}</b>
            </div>
            <div class="dots__container">
              {{{ButtonChat}}}
            </div>
          </div>
        {{/if}}

        {{#unless currentChatID}}
            Please, select/add chat from the list on the left
        {{/unless}}

        {{#if currentChatID}}
          <div class="messages__container">
            <div class ="message__date">19 января</div>
            <div class="message__counterparty__text">
              <p>counterparty</p>
              <p>counterparty</p>
              <div class="message__time">
                11:34
              </div>
            </div>

            <div class="message__user">
              message from the userx
              <div class="message__time">
                <svg class="reading_status" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7 .1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/></svg>
                11:34
              </div>
            </div>

            <div class="message__counterparty__img">
              <img src="src/assets/imgs/counterparty_img.jpg" alt="Avatar" class="message_img">
              <div class="message__time">
                11:34
              </div>
            </div>
            </div>

            <div class="chat__footer">
              {{{ButtonAttach}}}
            <div>
              {{{InputMessage}}}
            </div>
            <div class="button_container">
              {{{ButtonSend}}}
            </div>
          {{/if}}
        </div>

        ${this.props.isPopupChatOpen ? '{{{PopupChat}}}' : ''}
        ${this.props.isPopupAttachOpen ? '{{{PopupAttach}}}' : ''}

      </div>
    </main>
    `;
  }
}
