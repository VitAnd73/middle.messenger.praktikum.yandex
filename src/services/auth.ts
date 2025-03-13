import {SignInInput, User} from "../types/user.ts";

import AuthApi from "../api/auth.ts";
import { GetChats } from "./chat.ts";
import { responseHasError } from "../api/utils.ts";

const authApi = new AuthApi();

export async function signup(data: User){
    const response = await authApi.signup(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
    await getUser();
}

export async function signin(data: SignInInput){
    const response = await authApi.signin(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
    await getUser();
    await GetChats({});
}

export async function getUser(){
    const response = await authApi.me();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user:  response.data as User});
}

export async function logout(){
    const response = await authApi.logout();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: null});
}

