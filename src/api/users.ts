import { ApiError, ChangePasswordInput, User } from "../types/user";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

export default class UserApi {
    private readonly _authApi;
    constructor(apiPath: string = '/user'){
        this._authApi = new HTTPTransport(apiPath);
    }
    async updateProfile(data: User): Promise<HttpResult<User | ApiError>> {
        return this._authApi.put<User>('/profile', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async updatePassword(data: ChangePasswordInput) {
        return this._authApi.put<void>('/password', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async updateAvatar(file: FormData) {
        return this._authApi.put<User>('/profile/avatar', {
            data: file
        })
    }

    async getUserByID(id: number) {
        return this._authApi.get<User>(`/${id}`)
    }

    async searchUserByLogin(login: string) {
        return this._authApi.post<User[]>('/search', {
            headers: { "Content-Type": 'application/json'},
            data: { login }
        })
    }
}
