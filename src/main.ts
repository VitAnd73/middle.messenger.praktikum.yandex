import * as Components from "./components";
import * as Pages from "./pages";

import { APP_QUERY_SELECTOR, RouteStrs } from "./constants";

import { AppState } from "./types/domain/app-state";
import { Block } from "./core";
import Handlebars from "handlebars";
import { IInfoPageProps } from "./pages/info/info";
import { IProfilePageProps } from "./pages/profile/profile";
import { Router } from "./core/routing/router";
import { Store } from "./core/store/store";
import avatarSample from "./assets/imgs/img_avatar.png";
import { registerComponent } from "./core/registerComponent";

// #region Handlebars
Handlebars.registerHelper({
  eq: (v1: unknown, v2: unknown) => v1 === v2,
  ne: (v1: unknown, v2: unknown) => v1 !== v2,
  lt: (v1: string, v2: string) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and(...args: unknown[]) {
    return Array.prototype.every.call(args, Boolean);
  },
  or(...args: unknown[]) {
    return Array.prototype.slice.call(args, 0, -1).some(Boolean);
  },
});

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component as typeof Block);
});

// #endregion
declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

// #region routing stuff
const initState: AppState = {
  error: null,
  user: null,
  currentChatID: undefined,
  chats: [],
};
window.store = new Store<AppState>(initState);

const router = new Router(APP_QUERY_SELECTOR);
window.router = router;
router.use(RouteStrs.Signin, Pages.SigninPage as typeof Block);
router.use(RouteStrs.Signup, Pages.SignupPage as typeof Block);
router.use(RouteStrs.Messenger, Pages.ChatsPage as typeof Block);
router.use(
  RouteStrs.Settings,
  Pages.ProfilePage as typeof Block,
  {
    status: "display",
  } as IProfilePageProps,
);
router.use(
  RouteStrs.Page500,
  Pages.InfoPage as typeof Block,
  {
    title: "500",
    text: "Мы уже фиксим",
    buttonLabel: "Назад к чатам",
    btnClick: () => Router.getRouter().go(RouteStrs.Messenger),
  } as IInfoPageProps,
);
router
  .use(
    RouteStrs.Page404,
    Pages.InfoPage as typeof Block,
    {
      title: "404",
      text: "Не туда попали",
      buttonLabel: "Назад к чатам",
      btnClick: () => Router.getRouter().go(RouteStrs.Messenger),
    } as IInfoPageProps,
  )
  .start();
// #endregion
