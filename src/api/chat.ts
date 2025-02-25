import { APIError, ChatDTO, CreateChat } from "./types";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat): Promise<HttpResult<void | APIError>> {
        return chatApi.post<void>('/', {data})
    }

    async getChats(): Promise<HttpResult<ChatDTO[] | APIError >> {
        return chatApi.get<ChatDTO[]>('')
    }
}
