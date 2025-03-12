import Block, { IProps } from "../../core/block";

import { ChatMessage } from "../../models/ChatMessage";

interface IChatMessagesProps extends IProps {
    messages?: ChatMessage[],
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
      return `<div>
        {{{ ChatMessageItem }}}
      </div>`
    }
}

// {{#each messages  as |message|}}
//                 {{{ ChatMessageItem message=message }}}
//             {{/each}}
