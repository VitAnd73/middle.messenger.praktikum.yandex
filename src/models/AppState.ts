import {Chat} from "./Chat.ts";
import {User} from "./User.ts";

export type AppState = {
    error: string | null,
    user: User | null,
    chats: Chat[],
    currentChatID: number | undefined,
}
