import {SignInInput, User} from "../models/User.ts";

import AuthApi from "../api/auth.ts";
import { getChats } from "./chat.ts";
import { responseHasError } from "../api/utils.ts";

const authApi = new AuthApi();

const signup = async (data: User) => {
    const response = await authApi.signup(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    await getUser();
}

const signin = async (data: SignInInput) => {
    const response = await authApi.signin(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
    await getUser();
    await getChats({});
}

const getUser = async () => {
    const response = await authApi.me();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user:  response.data as User});
}

const logout = async () => {
    const response = await authApi.logout();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: null});
}

export {
    signup,
    signin,
    getUser,
    logout
}
