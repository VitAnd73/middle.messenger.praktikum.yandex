import * as Pages from '../pages';

const pages = {
    'login': new Pages.LoginPage(),
    // 'emails': Pages.CatMails,
    // 'registration': Pages.Registration
};

// TODO update main mechanics
export function navigate(page: string) {
    const app = document.getElementById('app')!;

    const component = pages[page as keyof typeof pages]
    app.innerHTML = '';
    app.append(component.getContent()!);
}
