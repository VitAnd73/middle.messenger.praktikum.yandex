import {
  Chat,
  CreateChatResponse,
  InputToAddRemoveUser,
  InputToGetChat,
} from "../types/domain/chat";

import ChatApi from "./chat";
import { Indexed } from "../types/generics";
import { User } from "../types/domain/user";
import { connectChatMessages } from "./messageServices";
import { merge } from "../utils/util-functions";
import { responseHasError } from "./utils";

const chatApi = new ChatApi();

export async function ReceiveChats(data: InputToGetChat) {
  const receivedChats = await chatApi.getChats(data);
  if (responseHasError(receivedChats)) {
    throw Error(receivedChats.data.reason);
  }
  const existingChats = window.store.getState().chats;
  const newChats = receivedChats.data as unknown as Chat[];

  const chatsWithConnection = await Promise.all(
    newChats.map(async (newChat) => {
      const existingChat = existingChats.find(
        (oldChat) => newChat.id === oldChat.id,
      );
      if (existingChat) {
        existingChat.users = await getChatUsers(existingChat.id);
        return merge(
          existingChat as object as Indexed,
          newChat as object as Indexed,
        ) as object as Chat;
      } else {
        const currentUser = window.store.getState().user;
        newChat.token = await getChatToken(newChat.id);
        newChat.users = await getChatUsers(newChat.id);
        if (currentUser) {
          const newChatWithConnection = connectChatMessages(
            newChat,
            currentUser,
          );
          return newChatWithConnection ? newChatWithConnection : newChat;
        } else {
          return newChat;
        }
      }
    }),
  );
  window.store.set({ chats: chatsWithConnection });
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

  await ReceiveChats({});
}

export async function getChatUsers(chatID: number) {
  const response = await chatApi.getChatUsers(chatID);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  return response.data as User[];
}

export async function getChatToken(chatID: number) {
  const response = await chatApi.requestChatToken(chatID);
  if (responseHasError(response)) {
    throw Error(response.data.reason);
  }

  return response.data.token;
}
