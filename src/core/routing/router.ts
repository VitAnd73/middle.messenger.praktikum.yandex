import Block, { IProps } from "../block";
import Route, { IRoute } from "./route";

import { Class } from "../../types/generics";
import { ReceiveChats } from "../../api/chatServices";
import { RouteStrs } from "../../constants";
import { getUser } from "../../api/authServices";

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

  public static getRouter() {
    return this.__instance;
  }

  use(pathname: string, block: Class<Block>, params?: IProps) {
    const curParams = { ...params, rootQuery: this._rootQuery };
    const route = new Route(pathname, block, curParams);
    this.routes.push(route);
    return this;
  }

  async start() {
    window.onpopstate = () => {
      this._onRoute(window.location?.pathname);
    };

    const curPath = window.location.pathname as RouteStrs;

    try {
      await getUser();
      await ReceiveChats({});
      if (curPath && (curPath===RouteStrs.Messenger)) {
        this.go(RouteStrs.Messenger);
      } else if (curPath && (curPath===RouteStrs.Signin || curPath===RouteStrs.Signup )) {
        alert('You already signed-in! Going to the messenger!');
        this.go(RouteStrs.Messenger);
      } else if (curPath && curPath===RouteStrs.Settings ) {
        this.go(RouteStrs.Settings);
      }
      else {
        this.go(RouteStrs.Page500);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (curPath && curPath===RouteStrs.Signup) {
        this.go(RouteStrs.Signup);
      }
      else {
        if (curPath && (curPath!==RouteStrs.Signin)) alert('You are not signed-in! Signin first!');
        this.go(RouteStrs.Signin);
      }
      return;
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
    return this.routes.find((route) => route.match(pathname));
  }

  public currentRoutePathName() {
    return this._currentRoute ? this._currentRoute.pathname : null;
  }
}
