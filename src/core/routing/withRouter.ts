import Block, { PropsWithChildrenType } from "../block";

import { Class } from "../../types";

export function withRouter(WrappedBlock: Class<Block>) {
    return class extends WrappedBlock {
        constructor(props: PropsWithChildrenType) {
            super({ ...props, router: window.router });
        }
    }
}
