import { ApiError, User } from "../types/domain/user";
import {
  Chat,
  CreateChatResponse,
  InputToAddRemoveUser,
  InputToGetChat,
  TokenRequestResponse,
} from "../types/domain/chat";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

export default class ChatApi {
  private readonly _authApi: HTTPTransport;
  constructor(apiPath: string = "/chats") {
    this._authApi = new HTTPTransport(apiPath);
  }

  async getChats(data: InputToGetChat): Promise<HttpResult<Chat[] | ApiError>> {
    return this._authApi.get<Chat[]>("", {
      data: data,
    });
  }

  async createChat(
    title: string,
  ): Promise<HttpResult<CreateChatResponse | ApiError>> {
    return this._authApi.post<CreateChatResponse>("", {
      headers: { "Content-Type": "application/json" },
      data: { title: title },
    });
  }

  async deleteChat(id: number): Promise<HttpResult<object | ApiError>> {
    return this._authApi.delete("", {
      headers: { "Content-Type": "application/json" },
      data: { chatId: id },
    });
  }

  async addUsersToChat(data: InputToAddRemoveUser) {
    return this._authApi.put("/users", {
      headers: { "Content-Type": "application/json" },
      data: data,
    });
  }

  async removeUsersFromChat(data: InputToAddRemoveUser) {
    return this._authApi.delete("/users", {
      headers: { "Content-Type": "application/json" },
      data: data,
    });
  }

  async getChatUsers(id: number) {
    return this._authApi.get<User[]>(`/${id}/users`);
  }

  async requestChatToken(id: number) {
    return this._authApi.post<TokenRequestResponse>(`/token/${id}`);
  }

  async updateChatAvatar(file: FormData, chatId: number) {
    file.append("chatId", String(chatId));
    return this._authApi.put("/avatar", { data: file });
  }
}
