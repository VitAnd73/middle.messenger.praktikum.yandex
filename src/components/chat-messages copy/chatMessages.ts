import Block, { IProps } from "../../core/block";

import { Message } from "../../types/message";

interface IChatMessagesProps extends IProps {
    messages: Message[],
}

export default class ChatMessages extends Block<IChatMessagesProps> {
    constructor() {
        const curState = window.store.getState();
        const currentChatID = curState.currentChatID;
        const currentChat = curState.chats.find((chat) => chat.id === currentChatID);

        super({
            messages: currentChat?.messages || [],
        });
    }

    public render(): string {

        return `<div>
            {{#each messages  as |message|}}
                {{{ ChatMessageItem message=message }}}
            {{/each}}
        </div>`
    }
}
