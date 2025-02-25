import * as Components from './components';
import * as Pages from './pages';

import { APP_QUERY_SELECTOR, RouteStrs } from './constants';

import { AppState } from './types';
import Handlebars from 'handlebars';
import { Router } from './core/routing/router';
import { Store } from './core/store/store';
import avatarSample from './assets/imgs/img_avatar.png';

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
  }
});

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

// #endregion
declare global {
  interface Window {
    store: Store<AppState>;
    router: Router
  }
}

// #region routing stuff
const initState: AppState = {
  error: null,
  user: null,
  isOpenDialogChat: false,
  selectedChat: null,
  chats: []
}
window.store = new Store<AppState>(initState);

const router = new Router(APP_QUERY_SELECTOR);
window.router = router;
router.use(RouteStrs.Nav, Pages.NavigatePage)
router.use(RouteStrs.Signin, Pages.SigninPage)
router.use(RouteStrs.Signup, Pages.RegisterPage)
router.use(RouteStrs.Messenger, Pages.ChatsPage)
router.use(RouteStrs.Settings, Pages.ProfilePage, {
  avatar: avatarSample,
  status: "display",
})
router.use(RouteStrs.Page500, Pages.InfoPage, {
  title: '500',
  text: 'Мы уже фиксим',
  buttonLabel: 'Назад к чатам',
})
router.use(RouteStrs.Page404, Pages.InfoPage, {
  title: '404',
  text: 'Не туда попали',
  buttonLabel: 'Назад к чатам',
})
.start();
// #endregion
