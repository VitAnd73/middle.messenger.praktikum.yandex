import Block, { PropsWithChildrenType } from "./block";

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Class<T> = new (...args: any[]) => T;

export default class Route {
    _pathname: string;
    _blockClass: Class<Block>;
    _block: null | Block;
    _props: PropsWithChildrenType;
    constructor(pathname : string, view : Class<Block>, props: PropsWithChildrenType) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block?.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    _renderDom(query: string, block: Block) {
        const root = document.querySelector(query);
        root!.innerHTML = "";
        root!.append(block.getContent());
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
        }

        // this._block.show();
        this._renderDom((this._props.rootQuery as string), this._block);
        this._block.componentDidMount();
    }
}


// export class Router {
//   static __instance: any;
//   routes: never[];
//   history: History;
//   _currentRoute: null;
//   _rootQuery: any;
//   constructor(rootQuery) {
//       if (Router.__instance) {
//           return Router.__instance;
//       }

//       this.routes = [];
//       this.history = window.history;
//       this._currentRoute = null;
//       this._rootQuery = rootQuery;

//       Router.__instance = this;
//   }

//   use(pathname, block) {
//       const route = new Route(pathname, block, {rootQuery: this._rootQuery});
//       this.routes.push(route);
//       return this;
//   }

//   start() {
//     window.onpopstate = event => {
//       this._onRoute(event.currentTarget.location.pathname);
//     };

//     this._onRoute(window.location.pathname);
//   }

//   _onRoute(pathname) {
//       const route = this.getRoute(pathname);
//       if (!route) {
//         return;
//       }

//       if (this._currentRoute) {
//         this._currentRoute.leave();
//       }

//       this._currentRoute = route;
//       route.render(route, pathname);
//   }

//   go(pathname) {
//     this.history.pushState({}, "", pathname);
//     this._onRoute(pathname);
//   }

//   back() {
//     this.history.back();
//   }

//   forward() {
//     this.history.forward();
//   }

//   getRoute(pathname) {
//       return this.routes.find(route => route.match(pathname));
//   }
// }
