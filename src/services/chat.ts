import ChatApi from "../api/chat";
import { ChatDTO } from "../api/types";
import { apiHasError } from "../utils/apiHasError";
import { transformChats } from "../utils/apiTransformers";

const chatApi = new ChatApi();

const getChats = async () => {
    const responseChat = await chatApi.getChats();
    if(apiHasError(responseChat)) {
        throw Error(responseChat.reason)
    }
    return transformChats(responseChat as unknown as ChatDTO[]);
}

const createChat = async (title: string) => {
    const response = await chatApi.create({title});
    if(apiHasError(response)) {
        throw Error(response.reason)
    }

    const responseChat = await chatApi.getChats();
    if(apiHasError(responseChat)) {
        throw Error(responseChat.reason)
    }

    const chats = await getChats();
    window.store.set({chats})
}

export {
    createChat,
    getChats
}
