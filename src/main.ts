import * as Components from './components';
import * as Pages from './pages';

import { APP_QUERY_SELECTOR, RouteStrs } from './constants';

import { AppState } from './models/AppState';
import { Block } from './core';
import { Class } from './utils/types';
import Handlebars from 'handlebars';
import { IProfilePageProps } from './pages/profile/profile';
import { InfoPageProps } from './pages/info/info';
import { Router } from './core/routing/router';
import { Store } from './core/store/store';
import avatarSample from './assets/imgs/img_avatar.png';
import { registerComponent } from './core/registerComponent';

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

Object.entries(Components).forEach(([ name, component ]) => {
  registerComponent(name, component as typeof Block);
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
  currentChatID: undefined,
  chats: []
}
window.store = new Store<AppState>(initState);

const router = new Router(APP_QUERY_SELECTOR);
window.router = router;
router.use(RouteStrs.Navigation, Pages.NavigatePage as Class<Block>)
router.use(RouteStrs.Signin, Pages.SigninPage as unknown as Class<Block>)
router.use(RouteStrs.Signup, Pages.SignupPage as unknown as Class<Block>)
router.use(RouteStrs.Messenger, Pages.ChatsPage as unknown as Class<Block>)
router.use(RouteStrs.Settings, Pages.ProfilePage as unknown as Class<Block>, {
  avatar: avatarSample,
  status: "display",
} as IProfilePageProps)
router.use(RouteStrs.Page500, Pages.InfoPage as unknown as Class<Block>, {
  title: '500',
  text: 'Мы уже фиксим',
  buttonLabel: 'Назад к чатам',
  btnClick: () => Router.getRouter().go(RouteStrs.Navigation),
} as InfoPageProps )
router.use(RouteStrs.Page404, Pages.InfoPage as unknown as Class<Block>, {
  title: '404',
  text: 'Не туда попали',
  buttonLabel: 'Назад к чатам',
  btnClick: () => Router.getRouter().go(RouteStrs.Navigation),
} as InfoPageProps )
.start();
// #endregion
