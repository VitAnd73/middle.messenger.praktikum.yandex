import { Chat } from "../types/chat";
import { Message } from "../types/message";
import { SOCKET_CHAT } from "../constants";
import SocketTransport from "../core/transport/socketTransport";
import { User } from "../types/user";
import { GetChats } from "./chat";

export function openConnectMessages(chat: Chat, currentUser: User) {
  if (!chat.id) return;
  if (!chat.users) return;
  if (!chat.token) return;
  if (chat.connection && chat.connection.getState() === "OPEN") return;
  if (!currentUser.id) return;

  const socket = new SocketTransport(
    SOCKET_CHAT,
    currentUser.id,
    chat.id,
    chat.token,
  );
  socket.open(() => {
    getAllNewMessage(0, chat);
    setInterval(() => {
      socket.ping();
    }, 15000);
  });

  socket.message(async (event: MessageEvent) => {
    let message: Message | null = null;
    try {
      message = JSON.parse(event.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log("'Unknown message!'");
    }

    if (!message) return;

    message.chat_id = chat.id;

    if (
      message.type === "message" ||
      Array.isArray(message) ||
      message.type === "file"
    ) {
      if (!chat.messages) {
        chat.messages = [];
      }

      if (Array.isArray(message)) {
        message.reverse();
        chat.messages = chat.messages.concat(message);
      } else {
        chat.messages.push(message);
      }

      await GetChats({});
      window.store.set({ chats: window.store.getState().chats });
    }

    if (event.data.type === "user connected") {
      console.log("user connected", event.data);
    }
  });

  chat.connection = socket;
  return chat;
}

export function sendMessage(message: string) {
  const currentChatID = window.store.getState().currentChatID;
  const chat = window.store
    .getState()
    .chats.find((chat: Chat) => chat.id == currentChatID);

  const user = window.store.getState().user;
  if (!chat) {
    throw Error("Select Chat!");
  }

  if (chat.connection && chat.connection.getState() === "OPEN") {
    chat.connection.sendMessage(message);
  } else if (user) {
    openConnectMessages(chat, user);
  }
}

export function getAllNewMessage(limit: number, chat: Chat | null) {
  if (!chat) {
    throw Error("Select Chat!");
  }

  if (chat.connection) {
    chat.connection.sendRequestForgetMessage(limit);
    chat.unread_count = 0;
  }
}
