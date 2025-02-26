import Block, { PropsWithChildrenType } from "../block";

import { Class } from "../../utils/types";
import { isEqualStrs } from "../../utils/utils";

export interface IRoute {
    render: () => void;
    match: (path: string) => boolean;
    leave: () => void;
    pathname: string;
}

export default class Route implements IRoute {
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

    public get pathname() {
        return this._pathname
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
        return isEqualStrs(pathname, this._pathname);
    }

    _renderDom(query: string, block: Block) {
        const root = document.querySelector(query);
        root!.innerHTML = "";
        root!.append(block.getContent());
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
        }

        this._block.show();
        this._renderDom((this._props.rootQuery as string), this._block);
        this._block.componentDidMount();
    }
}
