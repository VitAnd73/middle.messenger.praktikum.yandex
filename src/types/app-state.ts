import {Chat} from "./chat.ts";
import {User} from "./user.ts";

export type AppState = {
    error: string | null,
    user: User | null,
    chats: Chat[],
    currentChatID: number | undefined,
}
