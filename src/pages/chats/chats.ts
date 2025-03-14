import Block, { IProps } from "../../core/block";
import { Chat, InputToAddRemoveUser } from "../../types/domain/chat";
import {
  ReceiveChats,
  addUserToChat,
  deleteChat,
  removeUsersFromChat,
} from "../../api/chatServices";

import { StoreEvents } from "../../core/store/store";
import { connectChatMessages } from "../../api/messageServices";
import { messageValidator } from "../../utils/validators";
import { searchUserByLogin } from "../../api/usersServices";

interface IChatPageProps extends IProps {
  isPopupChatOpen?: boolean;
  isPopupAttachOpen?: boolean;
  isPopupAddUserOpen?: boolean;
  isPopupRemoveUserOpen?: boolean;
  currentChatID?: number;
  chatList?: Chat[];

  message?: string;
  messageError?: string;
  onMessageChange?: (e: InputEvent) => void;
  onBtnSendMessageClick?: () => void;

  onBtnChatClick?: () => void;

  chatPopupMenuItemHandlers: {
    onAddUserToChatItemClick?: () => void;
    onRemoveUserFromChatItemClick?: () => void;
    onDeleteChatItemClick?: () => void;
  };
  userPopupHandlers: {
    onAddUserToChat?: (userLogin?: string) => void;
    onRemoveUserFromChat?: (inputFieldValue?: string) => void;
    onCancelUserPopupClick?: () => void;
  };

  onBtnAttachClick?: () => void;
}

export default class ChatsPage extends Block<IChatPageProps> {
  constructor(props?: IChatPageProps) {
    const chats = props?.chatList ?? window.store.getState().chats;
    const currentChatID = window.store.getState().currentChatID;
    super({
      ...props,
      message: props?.message ?? "",
      messageError: messageValidator?.validate(props?.message ?? ""),
      chatList: chats,
      currentChatID,
      onMessageChange: (e: InputEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        const curError = messageValidator?.validate(value);
        this.setProps({
          ...this.props,
          message: value,
          messageError: curError,
        });
      },
      onBtnSendMessageClick: () => {
        let curError = messageValidator?.validate(this.props.message!);
        if (curError) {
          alert(`Error! ${curError}`);
          return;
        }
        const currentChatID = window.store.getState().currentChatID;
        const chat = window.store
          .getState()
          .chats.find((chat) => chat.id == currentChatID);
        const user = window.store.getState().user;
        if (!chat) {
          throw Error("Select Chat!");
        }
        if (chat.connection && chat.connection.getState() === "OPEN") {
          chat.connection.sendMessage(this.props.message!);
        } else if (user) {
          connectChatMessages(chat, user);
        }
        curError = messageValidator?.validate("");
        this.setProps({
          ...this.props,
          message: "",
          messageError: curError,
        });
      },
      onBtnAttachClick: () => {
        const curPopUpState = this.props?.isPopupAttachOpen ?? true;
        this.setProps({
          ...this.props,
          isPopupAttachOpen: !curPopUpState,
        });
      },
      onBtnChatClick: () => {
        const curPopUpState = this.props?.isPopupChatOpen ?? true;
        this.setProps({
          ...this.props,
          isPopupChatOpen: !curPopUpState,
        });
      },
      chatPopupMenuItemHandlers: {
        onAddUserToChatItemClick: () => {
          this.setProps({
            ...this.props,
            isPopupChatOpen: false,
            isPopupAddUserOpen: true,
          });
        },
        onRemoveUserFromChatItemClick: () => {
          this.setProps({
            ...this.props,
            isPopupChatOpen: false,
            isPopupRemoveUserOpen: true,
          });
        },
        onDeleteChatItemClick: () => {
          const curChatId = window.store.getState().currentChatID;
          if (curChatId) {
            deleteChat(curChatId)
              .then(() => {
                ReceiveChats({})
                  .then()
                  .catch((error) => console.warn("delete chat:", error));
              })
              .catch((error) => console.warn("delete chat:", error));
          }
          this.closeChatPopup();
          window.store.set({ currentChatID: undefined });
        },
      },

      userPopupHandlers: {
        onAddUserToChat: (login?: string) => {
          if (login) {
            searchUserByLogin(login)
              .then((users) => {
                if (!users.length) {
                  alert(
                    "No users for the login are found. Change login to search users!",
                  );
                } else {
                  const currentChatID = window.store.getState().currentChatID;
                  addUserToChat({
                    users: users.map((u) => u.id),
                    chatId: currentChatID,
                  } as InputToAddRemoveUser)
                    .then(() => this.closeUserPopup())
                    .catch((error) => {
                      console.log("add users to chat:", error);
                    });
                }
              })
              .catch((error) => {
                alert("Something went wrong! Try again!");
                console.log("search users:", error);
              });
          }
        },
        onRemoveUserFromChat: (login?: string) => {
          if (login) {
            searchUserByLogin(login)
              .then((users) => {
                if (!users.length) {
                  alert(
                    "No users for the login are found. Change login to search users!",
                  );
                } else {
                  const currentChatID = window.store.getState().currentChatID;
                  removeUsersFromChat({
                    users: users.map((u) => u.id),
                    chatId: currentChatID,
                  } as InputToAddRemoveUser)
                    .then(() => this.closeUserPopup())
                    .catch((error) => {
                      console.log("remove users to chat:", error);
                    });
                }
              })
              .catch((error) => {
                alert("Something went wrong! Try again!");
                console.log("onRemoveUserFromChat error:", error);
              });
          }
        },
        onCancelUserPopupClick: () => {
          this.closeUserPopup();
        },
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
  private closeUserPopup() {
    this.setProps({
      ...this.props,
      isPopupAddUserOpen: false,
      isPopupRemoveUserOpen: false,
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
    const curChat = curState.chats?.find((c) => c.id === curChatId);
    const avatarSource = curChat?.avatar ?? "src/assets/imgs/img_avatar.png";

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

          {{{ ChatMessages }}}

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
          </div>
        {{/if}}

        ${
          this.props.isPopupChatOpen
            ? `{{{PopupChat
          className = "popupChat"
          onAddUserToChatItemClick = chatPopupMenuItemHandlers.onAddUserToChatItemClick
          onRemoveUserFromChatItemClick = chatPopupMenuItemHandlers.onRemoveUserFromChatItemClick
          onDeleteChatItemClick = chatPopupMenuItemHandlers.onDeleteChatItemClick
        }}}`
            : ""
        }
        ${
          this.props.isPopupAddUserOpen
            ? `{{{PopupUser
          className = "popupUser"
          popupTitle = "Add user"
          inputFieldLabel = "User login"
          onOkClick = userPopupHandlers.onAddUserToChat
          onCancelClick = userPopupHandlers.onCancelUserPopupClick
        }}}`
            : ""
        }
        ${
          this.props.isPopupRemoveUserOpen
            ? `{{{PopupUser
          className = "popupUser"
          popupTitle = "Remove user"
          inputFieldLabel = "User login"
          onOkClick = userPopupHandlers.onRemoveUserFromChat
          onCancelClick = userPopupHandlers.onCancelUserPopupClick
        }}}`
            : ""
        }
        ${
          this.props.isPopupAttachOpen
            ? `{{{PopupAttach
          className = "popup"
        }}}`
            : ""
        }
      </div>
    </main>
    `;
  }
}
