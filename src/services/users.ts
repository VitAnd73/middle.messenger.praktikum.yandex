import { ChangePasswordInput, User } from "../models/User";

import UserApi from "../api/users";
import { responseHasError } from "../api/utils";

const userApi = new UserApi();

const updateProfile = async (data: User) => {
    const response = await userApi.updateProfile(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: response.data as User});
}

const updatePassword = async (data: ChangePasswordInput) => {
    const response = await userApi.updatePassword(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const updateAvatar = async (data: FormData) => {
    const response = await userApi.updateAvatar(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: response.data});
}

const searchUserByLogin = async (login: string) => {
    const response = await userApi.searchUserByLogin(login);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as User[]
}

export {
    updateProfile,
    updatePassword,
    updateAvatar,
    searchUserByLogin
}
