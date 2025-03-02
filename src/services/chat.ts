import { AddDeleteUserInput, Chat, CreateChatResponse, GetChatInput } from "../models/Chat";

import ChatApi from "../api/chat";
import { Indexed } from "../utils/types";
import { User } from "../models/User";
import { merge } from "../utils/utils";
import { openConnectMessages } from "./message";
import { responseHasError } from "../api/utils";

const chatApi = new ChatApi();

const getChats = async (data: GetChatInput) => {
    const responseChat = await chatApi.getChats(data);
    if(responseHasError(responseChat)) {
        throw Error(responseChat.data.reason)
    }
    const oldChats = window.store.getState().chats;
    const newChats= responseChat.data as unknown as Chat[];

    const connectedChats = await Promise.all(newChats.map(async (newChat) => {
        const oldChat = oldChats.find((oldChat) => newChat.id === oldChat.id)
        if (oldChat) {
            oldChat.users = await getChatUsers(oldChat.id)
            return merge(oldChat as object as Indexed, newChat as object as Indexed) as object as Chat
        } else { //if new chat was created
            const me = window.store.getState().user
            newChat.token = await getChatToken(newChat.id)
            newChat.users = await getChatUsers(newChat.id)
            if (me) {
                const newConnectedChat = openConnectMessages(newChat, me)
                return newConnectedChat ? newConnectedChat : newChat
            } else {
                return newChat
            }
        }
    }));

    window.store.set({chats: connectedChats });

}

const createChat = async (title: string) => {
    const response = await chatApi.createChat(title)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as CreateChatResponse
}

const deleteChat = async (id: number) => {
    const response = await chatApi.deleteChat(id)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const addUserToChat = async (data: AddDeleteUserInput) => {
    const response = await chatApi.addUsersToChat(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const deleteUsersFromChat = async (data: AddDeleteUserInput) => {
    const response = await chatApi.deleteUsersFromChat(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    await getChats({});

}

const getChatUsers = async (chatID: number) => {
    const response = await chatApi.getChatUsers(chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as User[]
}

const updateChatAvatar = async (file: FormData, chatID: number) => {
    const response = await chatApi.updateChatAvatar(file, chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    await getChats({});

    return response.data as User[]
}

const getChatToken = async (chatID: number) => {
    const response = await chatApi.getChatToken(chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data.token
}

export {
    getChats,
    createChat,
    deleteChat,
    addUserToChat,
    deleteUsersFromChat,
    getChatUsers,
    updateChatAvatar,
    getChatToken,
}
