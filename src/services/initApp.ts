import { getChats } from "./chat";
import { getUser } from "./auth";
import { navigate } from "../core/navigate";

const initApp = async () => {
    let me = null;
    try {
        me = await getUser();
    } catch (error) {
        navigate('login');
        return;
    }

    const chats = await getChats();
    window.store.set({user: me, chats});
    navigate('emails')
}

const initChatPage = async () => {
    const chats = await getChats();
    window.store.set({chats});
}

export {
    initApp,
    initChatPage
}
