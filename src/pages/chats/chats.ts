import Block, { PropsWithChildrenType } from "../../core/block";
import { Button, Input } from "../../components";

import { ButtonAttach } from "../../components/button-attach";
import { ChatList } from "../../components/chat-list";
import { PopupAttach } from "../../components/popup-attach";
import { messageValidator } from "../../core/utils/validators";

const authorSelfId = -1 //for the own messages
const noRespondentSelectedIndex = -1; //for no selected respondents

const respondentListInitial = [
  {
    id: 1,
    name: "Ivan",
    avatar: "src/assets/imgs/counterparty_img.jpg",
  },
  {
    id: 2,
    name: "Peter",
    avatar: "src/assets/imgs/counterparty_img.jpg",
  },
  {
    id: 3,
    name: "Ted",
    avatar: "src/assets/imgs/counterparty_img.jpg",
  },
] as const;

const messageListInitial = [
  {
    id: 1,
    authorId: 1,
    date: new Date('2022-05-14T07:06:05.123'),
    isRead: true,
    textHtml: `<p>ASdfjkashdajksaasdasdasddaasdh</p>`
  },
  {
    id: 1,
    authorId: authorSelfId,
    date: new Date('2022-05-14T07:06:05.123'),
    isRead: true,
    img: "src/assets/imgs/counterparty_img.jpg",
  },
] as const;

// type RespondentType = typeof respondentListInitial[number];
// type MessageType = typeof messageListInitial[number];

const chatStateInitial = {
  selectedRespondentId: noRespondentSelectedIndex, //means to resps are selected
  isPopupOpen: false, //for status of the popup
  searchStr: "",
  messageStr: "",
  messageErr: "",
}

type ChatStateType = typeof chatStateInitial;

const chatPageStateProps = {
  respondentList: respondentListInitial,
  messageList: messageListInitial,
  chatState: {...chatStateInitial},
}

type ChatPageStateType = typeof chatPageStateProps;

export default class ChatsPage extends Block {
  constructor(props: ChatPageStateType & PropsWithChildrenType = chatPageStateProps) {
    super("main", {
      ...props,
      ChatList: new ChatList({
        className: "sidenav",
      }),
      PopupAttach: new PopupAttach({
        className: "popup",
      }),
      ButtonAttach: new ButtonAttach({
        onClick: () => {
          this.setProps({
            ...this.props,
            chatState: {
              ...(this.props.chatState as object),
              isPopupOpen: !((this.props.chatState as ChatStateType).isPopupOpen),
            }
          });
        },
      }),
      InputMessage: new Input({
        className: "input__message",
        placeholder: "Сообщение_sss",
        name: "message",
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
          console.log(`Current state: ${JSON.stringify({
            message: (this.props.chatState as ChatStateType).messageStr,
            err: (this.props.chatState as ChatStateType).messageErr,
          })}`);
        }
      }),
    });
  }
  public render(): string {
    return `
    <main>
      {{{ChatList}}}

      <div class="chat__container">
        <div class="chat__header">
          <div class="header__avatar">
            <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="avatar_img">
          </div>
          <div class="header__author">
            <b>Ivan</b>
          </div>
          <div class="dots"></div>
        </div>

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
        ${(this.props.chatState as ChatStateType).isPopupOpen ? '{{{PopupAttach}}}' : ''}
        <div class="chat__footer">
          {{{ButtonAttach}}}
          <div>
            {{{InputMessage}}}
          </div>
          <div class="button_container">
            {{{ButtonSend}}}
          </div>
        </div>

      </div>
    </main>
    `;
  }
}
