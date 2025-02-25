import { LoginRequestData, SignUpUser, UserDTO } from "../api/types";

import AuthApi from "../api/auth";
import { apiHasError } from '../utils/apiHasError'
import { transformUser } from "../utils/apiTransformers";

const authApi = new AuthApi();

export const getUser = async() => {
    const responseUser = await authApi.me();
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason)
    }
    return transformUser(responseUser.data as UserDTO);
}

export const signin = async (data: LoginRequestData) => {
    const response = await authApi.login(data);
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    const me = await getUser();
    window.store.set({user: me});
}

export const signup = async (data: SignUpUser) => {
    const response = await authApi.signup(data);
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    const me = await getUser();
    window.store.set({user: me});
}

export const logout = async () => {
    await authApi.logout();
    window.store.set({user: null, chats: []});
}
