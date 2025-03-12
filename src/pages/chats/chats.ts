import Block, { IProps } from "../../core/block";
import { deleteChat, getChats } from "../../services/chat";

import { Chat } from "../../models/Chat";
import { StoreEvents } from "../../core/store/store";
import { messageValidator } from "../../utils/validators";

interface IChatPageProps extends IProps {
  isPopupChatOpen?: boolean;
  isPopupAttachOpen?: boolean;
  isPopupUserOpen?: boolean;
  currentChatID?: number;
  chatList?: Chat[];
  message?: string;
  messageError?: string;
  onMessageChange?: (e: InputEvent)=> void;
  onBtnChatClick?: ()=> void;
  onAddUserToChatClick?: () => void;
  onDeleteChatClick?: () => void;
  onBtnAttachClick?: ()=> void;
  onBtnSendMessageClick?: ()=> void;
};

export default class ChatsPage extends Block<IChatPageProps> {
  constructor(props?: IChatPageProps ) {
    const chats = props?.chatList ?? window.store.getState().chats;
    const currentChatID = window.store.getState().currentChatID;
    console.log(`ChatsPage constructor currentChatID = ${currentChatID}`);
    super({
      ...props,
      message: props?.message ?? "",
      messageError: messageValidator?.validate(props?.message ?? ""),
      chatList: chats,
      currentChatID,
      onMessageChange: (e: InputEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        const cur_error = messageValidator?.validate(value);
        this.setProps({
            ...this.props,
            message: value,
            messageError: cur_error,
        });
      },
      onBtnSendMessageClick: () => {
        // TODO - add sending to the server
          console.log(`send with ${JSON.stringify(this.props)}`);
          // console.log(`Current state: ${JSON.stringify({
          //   message: (this.props.chatState as ChatStateType).messageStr,
          //   err: (this.props.chatState as ChatStateType).messageErr,
          // })}`);
      },
      onBtnAttachClick: () => {
          const curPopUpState = this.props?.isPopupAttachOpen ?? true;
          this.setProps({
            ...this.props,
            isPopupAttachOpen: !(curPopUpState),
          });
      },
      onBtnChatClick: () => {
        const curPopUpState = this.props?.isPopupChatOpen ?? true;
        this.setProps({
          ...this.props,
          isPopupChatOpen: !curPopUpState,
        });
      },
      onAddUserToChatClick: ()=> {
        this.setProps({
          ...this.props,
          isPopupChatOpen: false,
          isPopupUserOpen: true,
        });
      },
      onDeleteChatClick: ()=> {
        const curChatId = window.store.getState().currentChatID;
        if (curChatId) {
          deleteChat(curChatId)
          .then(() => {
              getChats({})
              .then()
              .catch((error) => console.warn('delete chat:', error));
          })
          .catch((error) => console.warn('delete chat:', error));
        }
        this.closeChatPopup();
        window.store.set({currentChatID: undefined });
      },
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
      chatList: window.store.getState().chats,
      currentChatID: window.store.getState().currentChatID,
    });
  }
  public render(): string {
    const curState = window.store.getState();
    const curChatId = curState.currentChatID as number;
    const curChat = curState.chats?.find(c => c.id===curChatId);
    const avatarSource = curChat?.avatar ?? "src/assets/imgs/img_avatar.png";

    console.log("Chats");
    

    return `
    <main>
      {{{ChatList}}}
      <div class="chat__container">
        {{#if currentChatID}}
          <div class="chat__header">
            <div class="header__avatar">
              <img src="${avatarSource}" alt="Avatar" class="avatar_img">
            </div>
            <div class="header__author">
              <b>${curChat?.title}</b>
            </div>
            <div class="dots__container">
              {{{Button
                className = "button-chat"
                onClick = onBtnChatClick
              }}}
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
              {{{ButtonAttach
                onClick = onBtnAttachClick
              }}}
            <div>
              {{{Input
                name = "message"
                className = "${this.props.messageError ? "input__message input__message_error" : "input__message"}"
                placeholder = "Сообщение"
                onChange = onMessageChange
                value = message
              }}}
            </div>
            <div class="button_container">
              {{{Button
                className = "button-send"
                onClick = onBtnSendMessageClick
                ${this.props.messageError ? "disabled = 'true'" : ""}
              }}}
            </div>
          {{/if}}
        </div>

        ${this.props.isPopupChatOpen ? `{{{PopupChat
          className = "popupChat"
          onAddUserToChatClick = onAddUserToChatClick
          onDeleteChatClick = onDeleteChatClick
        }}}` : ''}
        ${this.props.isPopupAttachOpen ?
        `{{{PopupAttach
          className = "popup"
        }}}` : ''}
        ${this.props.isPopupUserOpen ?
        `{{{PopupUser
          className = "popupUser"
          popupTitle = "Add user"
        }}}` : ''}
      </div>
    </main>
    `;
  }
}
