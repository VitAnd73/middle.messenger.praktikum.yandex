import Block, { IProps } from "../../core/block";

import { Message } from "../../types/message";

interface IChatMessagesProps extends IProps {
    messages?: Message[],
}

export default class ChatMessages extends Block<IChatMessagesProps> {
    constructor(props: IChatMessagesProps) {
        const curState = window.store.getState();
        const currentChatID = curState.currentChatID;
        const currentChat = curState.chats.find((chat) => chat.id === currentChatID);

        super({
          ...props,
          messages: currentChat?.messages || [],
        });
    }

    public render(): string {
      return `<div class = "messages__container">
        {{#each messages  as |message|}}
          {{{ ChatMessageItem message=message }}}
        {{/each}}
      </div>`
    }
}
