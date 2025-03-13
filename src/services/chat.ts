import {
  Chat,
  CreateChatResponse,
  InputToAddRemoveUser,
  InputToGetChat,
} from "../types/chat";
import ChatApi from "../api/chat";
import { Indexed } from "../utils/types";
import { User } from "../types/user";
import { merge } from "../utils/utils";
import { responseHasError } from "../api/utils";
import { openConnectMessages } from "./message";

const chatApi = new ChatApi();

export async function GetChats(data: InputToGetChat) {
  const responseChat = await chatApi.getChats(data);
  if (responseHasError(responseChat)) {
    throw Error(responseChat.data.reason);
  }
  const oldChats = window.store.getState().chats;
  const newChats = responseChat.data as unknown as Chat[];

  const connectedChats = await Promise.all(
    newChats.map(async (newChat) => {
      const oldChat = oldChats.find((oldChat) => newChat.id === oldChat.id);
      if (oldChat) {
        oldChat.users = await getChatUsers(oldChat.id);
        return merge(
          oldChat as object as Indexed,
          newChat as object as Indexed,
        ) as object as Chat;
      } else {
        const me = window.store.getState().user;
        newChat.token = await getChatToken(newChat.id);
        newChat.users = await getChatUsers(newChat.id);
        if (me) {
          const newConnectedChat = openConnectMessages(newChat, me);
          return newConnectedChat ? newConnectedChat : newChat;
        } else {
          return newChat;
        }
      }
    }),
  );

  window.store.set({ chats: connectedChats });
}

export async function createChat(title: string) {
  const response = await chatApi.createChat(title);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  return response.data as CreateChatResponse;
}

export async function deleteChat(id: number) {
  const response = await chatApi.deleteChat(id);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }
}

export async function addUserToChat(data: InputToAddRemoveUser) {
  const response = await chatApi.addUsersToChat(data);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }
}

export async function removeUsersFromChat(data: InputToAddRemoveUser) {
  const response = await chatApi.removeUsersFromChat(data);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  await GetChats({});
}

export async function getChatUsers(chatID: number) {
  const response = await chatApi.getChatUsers(chatID);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  return response.data as User[];
}

export async function updateChatAvatar(file: FormData, chatID: number) {
  const response = await chatApi.updateChatAvatar(file, chatID);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  await GetChats({});

  return response.data as User[];
}

export async function getChatToken(chatID: number) {
  const response = await chatApi.requestChatToken(chatID);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  return response.data.token;
}
