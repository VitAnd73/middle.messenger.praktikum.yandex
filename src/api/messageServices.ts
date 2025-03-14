import { Chat } from "../types/domain/chat";
import { Message } from "../types/domain/message";
import { ReceiveChats } from "./chatServices";
import { SOCKET_CHAT } from "../constants";
import SocketTransport from "../core/transport/socketTransport";
import { User } from "../types/domain/user";

export function connectChatMessages(chat: Chat, currentUser: User) {
  if (
    !chat.id ||
    !chat.users ||
    !chat.token ||
    (chat.connection && chat.connection.getState() === "OPEN") ||
    !currentUser.id
  )
    return;

  const socket = new SocketTransport(
    SOCKET_CHAT,
    currentUser.id,
    chat.id,
    chat.token,
  );
  socket.open(() => {
    getAllNewMessages(0, chat);
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

      await ReceiveChats({});
      window.store.set({ chats: window.store.getState().chats });
    }

    if (event.data.type === "user connected") {
      console.log("user connected", event.data);
    }
  });

  chat.connection = socket;
  return chat;
}

export function getAllNewMessages(limit: number, chat: Chat | null) {
  if (!chat) {
    throw Error("No chat to load messages!");
  }
  if (chat.connection) {
    chat.connection.sendRequestForOldMessages(limit);
    chat.unread_count = 0;
  }
}
