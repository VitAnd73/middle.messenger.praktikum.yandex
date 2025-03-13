import Block, { IProps } from "../../core/block";
import { Message } from "../../types/message";

interface IChatMessageItemProps extends IProps {
  message: Message;
}

export default class ChatMessageItem extends Block<IChatMessageItemProps> {
  constructor(props: IChatMessageItemProps) {
    super({
      ...props,
    });
  }

  public render(): string {
    const { message } = this.props;
    const isUser = message.user_id == window.store.getState().user?.id;
    const isImg = message.type === "file";

    return `
          <div class="message__${isUser ? "user" : "counterparty"}__${isImg ? "img" : "text"}">
            ${
              isImg
                ? '<img src="src/assets/imgs/counterparty_img.jpg" alt="Avatar" class="message_img">'
                : message.content
            }
            <div class="message__time">
              ${
                message.is_read
                  ? '<svg class="reading_status" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7 .1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/></svg>'
                  : ""
              }
              ${new Date(message.time).toLocaleTimeString()}
            </div>
          </div>
        `;
  }
}

// <div class="message__counterparty__text">
//   <p>counterparty</p>
//   <p>counterparty</p>
//   <div class="message__time">
//     11:34
//   </div>
// </div>

// <div class="message__user">
//   message from the userx
//   <div class="message__time">
//     <svg class="reading_status" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7 .1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/></svg>
//     11:34
//   </div>
// </div>

// <div class="message__counterparty__img">
//   <img src="src/assets/imgs/counterparty_img.jpg" alt="Avatar" class="message_img">
//   <div class="message__time">
//     11:34
//   </div>
// </div>

// <div class="message__user__img">
//   <img src="src/assets/imgs/counterparty_img.jpg" alt="Avatar" class="message_img">
//   <div class="message__time">
//     <svg class="reading_status" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7 .1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/></svg>
//     11:34
//   </div>
// </div>
