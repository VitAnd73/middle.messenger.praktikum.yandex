import { ApiError, SignInInput, SignUpResponse, User } from "../types/user";
import HTTPTransport, { HttpResult } from "../core/transport/httpTransport";

export default class AuthApi {
  private readonly _authApi;
  constructor(apiPath: string = "/auth") {
    this._authApi = new HTTPTransport(apiPath);
  }

  async signup(data: User): Promise<HttpResult<SignUpResponse | ApiError>> {
    return this._authApi.post<SignUpResponse>("/signup", {
      headers: { "Content-Type": "application/json" },
      data: data,
    });
  }

  async signin(data: SignInInput): Promise<HttpResult<void | ApiError>> {
    return this._authApi.post<void>("/signin", {
      headers: { "Content-Type": "application/json" },
      data: data,
    });
  }

  async me(): Promise<HttpResult<User | ApiError>> {
    return this._authApi.get("/user");
  }

  async logout(): Promise<HttpResult<void | ApiError>> {
    return this._authApi.post("/logout");
  }
}
