import { ProtectedRoutes, RouteStrs } from "../constants";

import { Router } from "../core/routing/router";
import { getChats } from "./chat";
import { getUser } from "./auth";

const initApp = async () => {
    const curPath = Router.getRouter().currentRoutePathName() as RouteStrs;
    if (curPath && ProtectedRoutes.includes(curPath)) {
        let me = null;
        try {
            me = await getUser();
        } catch (error) {
            if (Router.getRouter().currentRoutePathName() !== RouteStrs.Signin) {
                Router.getRouter().go(RouteStrs.Signin);
            }
            return;
        }
        const chats = await getChats();
        window.store.set({user: me, chats});
        Router.getRouter().go(curPath);
    }
    else if (curPath===null) {
        Router.getRouter().go(RouteStrs.Signin);
    }
}

const initChatPage = async () => {
    const chats = await getChats();
    window.store.set({chats});
}

export {
    initApp,
    initChatPage
}
