import * as Components from './components';
import * as Pages from './pages';

import Handlebars from 'handlebars';
import avatarSample from './assets/imgs/img_avatar.png';

const appTitle = 'Great chat app';
const defaultPage = 'nav';


const pages = {
  'chats': [ Pages.ChatsPage],
  '500': [ Pages.InfoPage, {
    title: '500',
    text: 'Мы уже фиксим',
    buttonLabel: 'Назад к чатам',
  }],
  '404': [ Pages.InfoPage, {
    title: '404',
    text: 'Не туда попали',
    buttonLabel: 'Назад к чатам',
  }],
  'login': [ Pages.LoginPage ],
  'register': [ Pages.RegisterPage ],
  'profile': [ Pages.ProfilePage, {
    avatar: avatarSample,
  } ],
  'nav': [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  console.log('html', temlpatingFunction(context))
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => {
  const {pathname} = window.location;
  if (pathname.length>1) {
    const navTo = pathname.substring(1);
    console.log(`current pathname = ${pathname}`);
    if (navTo in pages) {
      console.log(`navigate to navTo = ${navTo}`);
      navigate(navTo);
    }
    else {
      navigate(defaultPage);
    }
  }
  else {
    navigate(defaultPage);
  }
});

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    const {origin} = window.location;
    navigate(page);
    // window.history.pushState({}, '', `${origin}/${page}`);
    window.history.pushState({}, '', `/${page}`);
    window.history.replaceState({}, appTitle, `${origin}/${page}`);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
