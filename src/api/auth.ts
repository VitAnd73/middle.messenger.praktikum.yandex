import { APIError, LoginRequestData, SignUpResponse, SignUpUser, UserDTO } from "./types";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

export default class AuthApi {
    private readonly _authApi;
    constructor(apiPath: string = '/auth'){
        this._authApi = new HTTPTransport(apiPath);
    }

    async signup(data: SignUpUser): Promise<HttpResult<SignUpResponse | APIError>> {
        return this._authApi.post<SignUpResponse>('/signup', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async login(data: LoginRequestData): Promise<HttpResult<void | APIError>> {
        return this._authApi.post<void>('/signin', {
            headers: { "Content-Type": 'application/json'},
            data: data
        });
    }

    async me(): Promise<HttpResult<UserDTO | APIError>> {
        return this._authApi.get('/user');
    }

    async logout(): Promise<HttpResult<void | APIError>> {
        return this._authApi.post('/logout')
    }
}
