import { APIError, ChatDTO, CreateChat } from "./types";

import HTTPTransport from "../core/httpTransport";

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat): Promise<void | APIError> {
        return chatApi.post<void>('/', {data})
    }

    async getChats(): Promise<ChatDTO[] | APIError > {
        return chatApi.get<ChatDTO[]>('')
    }
}
