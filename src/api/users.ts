import { APIError, ChangePasswordInput } from "./types";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

import { User } from "../types";

const userApi = new HTTPTransport('/user');

export default class UserApi {
    async updateProfile(data: User): Promise<HttpResult<User | APIError>> {
        return userApi.put<User>('/profile', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async updatePassword(data: ChangePasswordInput) {
        return userApi.put<void>('/password', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async updateAvatar(file: FormData) {
        return userApi.put<User>('/profile/avatar', {
            data: file
        })
    }

    async getUserByID(id: number) {
        return userApi.get<User>(`/${id}`)
    }

    async searchUserByLogin(login: string) {
        return userApi.post<User[]>('/search', {
            headers: { "Content-Type": 'application/json'},
            data: { login }
        })
    }
}
