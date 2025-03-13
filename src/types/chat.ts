import { Message } from "./message";
import SocketTransport from "../core/transport/socketTransport";
import { User } from "./user";

export type Chat = {
    id: number;
    title: string;
    avatar?: string;
    type: string;
    unread_count: number;
    created_by: number;
    last_message: LastMessage;
    token?: string;
    users?: User[];
    connection?: SocketTransport | null;
    messages?: Message[] | null;
}

export type LastMessage = {
    user: User;
    time: string;
    content: string;
}

export type InputToGetChat = {
    offset?: number;
    limit?: number;
    title?: string;
}

export type CreateChatResponse = {
    id: number;
}

export type TokenRequestResponse = {
    token: string;
}

export type InputToAddRemoveUser = {
    users: number[];
    chatId: number;
}
