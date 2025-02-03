import * as Components from './components';
import * as Pages from './pages';

import Handlebars from 'handlebars';
import { Validator } from './core/utils/validation';
import { render } from './core/renderDom';

const appTitle = 'Great chat app';
const defaultPage = 'nav';


const pages = {
  'login': new Pages.LoginPage({
      loginValidator: new Validator(new RegExp("^(?=.{3,20})\\d*[a-zA-Z][a-zA-Z\\d_-]*$"), "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)!" ),
      passwordValidator: new Validator(new RegExp("^(?=.*\\d+.*$)(?=.*[A-Z]+.*$).{8,40}$"), "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра")
  }),

  // 'register': new Pages.RegisterPage(),
  // 'profile': [ Pages.ProfilePage, {
  //   avatar: avatarSample,
  //   changingAvatar: false,
  //   changingData: false,
  //   changingPwd: false,
  // } ],
  // 'profile-new-avatar': [ Pages.ProfilePage, {
  //   avatar: avatarSample,
  //   changingAvatar: true,
  //   changingData: false,
  //   changingPwd: false,
  // } ],
  // 'profile-change-data': [ Pages.ProfilePage, {
  //   avatar: avatarSample,
  //   changingAvatar: false,
  //   changingData: true,
  //   changingPwd: false,
  // } ],
  // 'profile-change-pwd': [ Pages.ProfilePage, {
  //   avatar: avatarSample,
  //   changingAvatar: false,
  //   changingData: false,
  //   changingPwd: true,
  // } ],
  // 'chats': [ Pages.ChatsPage],
  // '500': [ Pages.InfoPage, {
  //   title: '500',
  //   text: 'Мы уже фиксим',
  //   buttonLabel: 'Назад к чатам',
  // }],
  // '404': [ Pages.InfoPage, {
  //   title: '404',
  //   text: 'Не туда попали',
  //   buttonLabel: 'Назад к чатам',
  // }],

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
  console.log(`pathname = ${pathname}`);
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
