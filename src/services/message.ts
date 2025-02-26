import { Chat } from "../models/Chat";
import { ChatMessage } from "../models/ChatMessage";
import { SOCKET_CHAT } from "../constants";
import SocketTransport from "../core/transport/socketTransport";
import { User } from "../models/User";
import { getChats } from "./chat";

export const openConnectMessages = (chat: Chat, currentUser: User) => {
    if (!chat.id) return;
    if (!chat.users) return;
    if (!chat.token) return;
    if (chat.connection && chat.connection.getState() === 'OPEN') return;
    if (!currentUser.id) return;

    const socket = new SocketTransport(SOCKET_CHAT, currentUser.id, chat.id, chat.token);
    socket.open(() => {
        getAllNewMessage(0, chat);
        setInterval(() => {
            socket.ping();
        }, 15000);
    })

    socket.message(async (event: MessageEvent) => {
        let message: ChatMessage | null = null;
        try {
            message = JSON.parse(event.data);
        } catch (e) {
            console.log("'Unknown message!'")
        }

        if (!message)
            return;

        message.chat_id = chat.id

        if (message.type === 'message' || Array.isArray(message) || message.type === 'file') {
            if (!chat.messages) {
                chat.messages = [];
            }

            if (Array.isArray(message)) {
                message.reverse();
                chat.messages = chat.messages.concat(message);
            } else {
                chat.messages.push(message);
            }

            await getChats({})
            window.store.set({chats: window.store.getState().chats});

        }

        if (event.data.type === 'user connected') {
            console.log('user connected', event.data)
        }
    })

    chat.connection = socket;
    return chat;
}

export const sendMessage = (message: string) => {
    const currentChatID = window.store.getState().currentChatID;
    const chat = window.store.getState().chats.find((chat: Chat) => chat.id == currentChatID )

    const user= window.store.getState().user;
    if (!chat) {
        throw Error('Select Chat!');
    }

    if (chat.connection && chat.connection.getState() === 'OPEN') {
        chat.connection.sendMessage(message);
    } else if (user) {
        openConnectMessages(chat, user)
    }
}

export const getAllNewMessage = (limit: number, chat: Chat | null) => {
    if (!chat) {
        throw Error('Select Chat!');
    }

    if (chat.connection) {
        chat.connection.sendRequestForgetMessage(limit);
        chat.unread_count = 0;
    }
}
