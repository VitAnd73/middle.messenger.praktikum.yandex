import * as Components from './components';
import * as Pages from './pages';

import { AppState } from './types';
import Handlebars from 'handlebars';
import { Store } from './core/store';
import avatarSample from './assets/imgs/img_avatar.png';
import { render } from './core/renderDom';

const appTitle = 'Great chat app';
const defaultPage = 'nav';

const profileMock = {
  email: "ivanov@gmail.com",
  login: "ivanov",
  first_name: "Ivan",
  second_name: "Ivanov",
  phone: "89999998888",
}

const pages = {
  'login': new Pages.LoginPage(),
  'register': new Pages.RegisterPage(),
  'profile': new Pages.ProfilePage({
    avatar: avatarSample,
    status: 'display',
    formState: profileMock
  }),
  'profile-new-avatar': new Pages.ProfilePage ({
    avatar: avatarSample,
    status: 'changing-avatar',
    formState: profileMock,
  }),
  'profile-change-data': new Pages.ProfilePage ({
    avatar: avatarSample,
    status: 'changing-data',
    formState: profileMock,
  }),
  'profile-change-pwd': new Pages.ProfilePage ({
    avatar: avatarSample,
    status: 'changing-pwd',
  }),

  'chats': new Pages.ChatsPage(),
  
  '500': new Pages.InfoPage({
    title: '500',
    text: 'Мы уже фиксим',
    buttonLabel: 'Назад к чатам',
  }),
  '404': new Pages.InfoPage({
    title: '404',
    text: 'Не туда попали',
    buttonLabel: 'Назад к чатам',
  }),

  'nav': new Pages.NavigatePage(),
};

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

function navigate(page:  keyof typeof pages) {
  render('#app', pages[page]);
}



function navigateToPath() {
  const {pathname} = window.location;
  if (pathname.length > 1) {
    const navTo = pathname.substring(1);
    if (navTo in pages) {
      navigate(navTo as keyof typeof pages);
    }
    else {
      navigate(defaultPage);
    }
  }
  else {
    navigate(defaultPage);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const {pathname} = window.location;
  if (pathname.length>1) {
    const navTo = pathname.substring(1);
    if (navTo in pages) {
      navigate(navTo as keyof typeof pages);
    }
    else {
      navigate(defaultPage);
    }
  }
  else {
    navigate(defaultPage);
  }
});
window.addEventListener('popstate', () => navigateToPath());


declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;

}

const initState: AppState = {
  error: null,
  user: null,
  isOpenDialogChat: false,
  chats: []
}
window.store = new Store<AppState>(initState);

document.addEventListener('click', (e : MouseEvent) => {
  const page = (e.target as HTMLInputElement).getAttribute('page');
  if (page) {
    const {origin} = window.location;
    navigate(page as keyof typeof pages);
    window.history.pushState({}, '', `${origin}/${page}`);
    window.history.replaceState({}, appTitle, `${origin}/${page}`);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
