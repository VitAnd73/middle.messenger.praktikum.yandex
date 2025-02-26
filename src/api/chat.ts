import { AddDeleteUserInput, Chat, CreateChatResponse, GetChatInput, GetTokenResponse } from "../models/Chat";
import { ApiError, User } from "../models/User";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
    async getChats(data: GetChatInput): Promise<HttpResult<Chat[] | ApiError>> {
        return chatApi.get<Chat[]>('', {
            data: data
        })
    }

    async createChat(title: string): Promise<HttpResult<CreateChatResponse | ApiError>> {
        return chatApi.post<CreateChatResponse>('', {
            headers: { "Content-Type": 'application/json' },
            data: { title: title }
        });
    }

    async deleteChat(id: number): Promise<HttpResult<object | ApiError>> {
        return chatApi.delete('', {
            headers: { "Content-Type": 'application/json'},
            data: { chatId: id }}
        );
    }

    async addUsersToChat(data: AddDeleteUserInput) {
        return chatApi.put('/users', {
            headers: { "Content-Type": 'application/json'},
            data: data
        });
    }

    async deleteUsersFromChat(data: AddDeleteUserInput) {
        return chatApi.delete('/users', {
            headers: { "Content-Type": 'application/json'},
            data: data
        });
    }

    async getChatUsers(id: number) {
        return chatApi.get<User[]>(`/${id}/users`);
    }

    async getChatToken(id: number) {
        return chatApi.post<GetTokenResponse>(`/token/${id}`);
    }

    async updateChatAvatar(file: FormData, chatId: number) {
        file.append('chatId', String(chatId));
        return chatApi.put('/avatar', { data: file });
    }
}
