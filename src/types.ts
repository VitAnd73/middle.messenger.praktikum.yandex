export type Nullable<T> = T | null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class<T> = new (...args: any[]) => T;

export type AppState = {
    error: string | null,
    user: User | null,
    isOpenDialogChat: boolean,
    selectedChat: null,
    chats: Chat[]
}

export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
};

type LastMessage = {
    user: User,
    time: string,
    content: string
}

export type Chat = {
    id: number,
    title: string,
    avatar: Nullable<string>,
    unreadCount: number,
    lastMessage: LastMessage | null
}
