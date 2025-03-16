import { ChangePasswordInput, User } from "../types/domain/user";

import UserApi from "./users";
import { responseHasError } from "./utils";

const userApi = new UserApi();

export async function updateProfile(data: User) {
  const response = await userApi.updateProfile(data);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  window.store.set({ user: response.data as User });
}

export async function updatePassword(data: ChangePasswordInput) {
  const response = await userApi.updatePassword(data);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }
}

export async function searchUserByLogin(login: string) {
  const response = await userApi.searchUserByLogin(login);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  return response.data as User[];
}

export async function updateUserAvatar(data: FormData) {
  const response = await userApi.updateAvatar(data);
  if (responseHasError(response)) {
      throw Error(response.data.reason)
  }
  window.store.set({user: response.data});
}
