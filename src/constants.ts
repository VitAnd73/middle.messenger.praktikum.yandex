export const APP_QUERY_SELECTOR = '#app';

export const HOST = 'https://ya-praktikum.tech/api/v2';
export const HOST_RESOURCES = 'https://ya-praktikum.tech/api/v2/resources/';
export const SOCKET_CHAT='wss://ya-praktikum.tech/ws/chats/';

export enum RouteStrs {
    Nav = "/",
    Signin = "/signin",
    Signup = "/signup",
    Messenger = "/messenger",
    Settings = "/settings",
    Page500 = "/500",
    Page404 = "/404",
}

export const ProtectedRoutes = [RouteStrs.Messenger, RouteStrs.Settings];
