import Block, { IProps } from "../block";
import { ProtectedRoutes, RouteStrs } from "../../constants";
import Route, { IRoute } from "./route";

import { Class } from "../../utils/types";
import { GetChats } from "../../services/chat";
import { getUser } from "../../services/auth";

export class Router {
    static __instance: Router;
    routes: IRoute[];
    history: History;
    _currentRoute: IRoute | null;
    _rootQuery: string;
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    public static getRouter(){
        return this.__instance;
    }

    use(pathname: string, block: Class<Block>, params?: IProps) {
        const curParams = {...params, rootQuery: this._rootQuery};
        const route = new Route(pathname, block, curParams);
        this.routes.push(route);
        return this;
    }

    async start() {
        window.onpopstate = () => {
            this._onRoute(window.location?.pathname);
        };

        const curPath = window.location.pathname as RouteStrs;
        if (curPath && ProtectedRoutes.includes(curPath)) {
            try {
                await getUser();
            } catch (error) {
                this.go(RouteStrs.Signin);
                return;
            }

            await GetChats({});

            this.go(curPath);
        }
        else if (Object.values(RouteStrs).includes(curPath)) {
            this.go(curPath);
        }
        else {
            this.go(RouteStrs.Signin);
        }
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    public currentRoutePathName() {
        return this._currentRoute ? this._currentRoute.pathname : null;
    }
}
