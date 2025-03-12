import {ChatMessage} from "./ChatMessage";
import SocketTransport from "../core/transport/socketTransport";
import { User } from "./User";

export interface Chat {
    id: number;
    title: string;
    avatar?: string;
    type: string
    unread_count: number;
    created_by: number;
    last_message: LastMessage;

    token?: string;
    users?: User[];
    connection?: SocketTransport | null;
    messages?: ChatMessage[] | null;
}

export type LastMessage = {
    user: User
    time: string
    content: string
}

export type GetChatInput = {
    offset?: number
    limit?: number
    title?: string
}

export type CreateChatResponse = {
    id: number
}

export type GetTokenResponse = {
    token: string
}


export type AddRemoveUserInput = {
    users: number[]
    chatId: number
}
