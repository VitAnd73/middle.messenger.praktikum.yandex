import Block, { IProps } from "../block";
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
  _props: IProps;
  constructor(pathname: string, view: Class<Block>, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public get pathname() {
    return this._pathname;
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

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }

    this._block.show();
  }
}
