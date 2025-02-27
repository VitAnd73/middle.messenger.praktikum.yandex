import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from "../button";
import { PopupChatList } from "../popup-chat-list";

type ChatListProps = {
    isPopupChatListOpen?: boolean,
}

export default class ChatList extends Block {
    constructor(props: ChatListProps & PropsWithChildrenType) {
        super("div", {
            ...props,
            ButtonChatList: new Button({
                className: "chatlist__search",
                onClick: () => {
                    const curPopUpState = this.props?.isPopupChatListOpen ?? false;
                    this.setProps({
                        ...this.props,
                        isPopupChatListOpen: !curPopUpState,
                    });
                }
                }),
            PopupChatList: new PopupChatList({
                className: "popupChatList",
                onOkClick: () => {
                    // TODO create a new chat
                    
                    const curPopUpState = this.props?.isPopupChatListOpen ?? false;
                    this.setProps({
                        ...this.props,
                        isPopupChatListOpen: !curPopUpState,
                    });
                },
                onCancelClick: () => {
                    const curPopUpState = this.props?.isPopupChatListOpen ?? false;
                    this.setProps({
                        ...this.props,
                        isPopupChatListOpen: !curPopUpState,
                    });
                },

            }),
        });
    }
    public render(): string {

        return `
            <div class="chatlist__header">
                <input type="text" class="input__search" value placeholder="Поиск" name="search">
                {{{ButtonChatList}}}
            </div>

            <hr class="nav_divider">
            <div class="parent">
                <div class="child">
                    <div class="grand-child">
                    <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="item__avatar">
                    </div>
                    <div class="grand-child two">
                    <p><b>Ivan</b></p>
                    <p>ASdfjkashdajksaasdasdasddaasdh</p>
                    </div>
                    <div class="grand-child three">
                    <div class="grand-child-child">
                        19:43
                    </div>
                    <div class="grand-child-child count">
                        <div class="numberCircle">30</div>
                    </div>
                    </div>
                </div>
            </div>

            <hr class="nav_divider">
            <div class="parent">
                <div class="child">
                    <div class="grand-child one">
                    <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="item__avatar">
                    </div>
                    <div class="grand-child two">
                    <b>Ivan</b><br>SdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdSdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasd
                    </div>
                    <div class="grand-child three">
                    <div class="grand-child-child">
                        19:43
                    </div>
                    <div class="grand-child-child count">
                        <div class="numberCircle">30</div>
                    </div>
                    </div>
                </div>
            </div>

            <hr class="nav_divider">
            <div class="parent__selected">
                <div class="child">
                    <div class="grand-child one">
                    <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="item__avatar">
                    </div>
                    <div class="grand-child two">
                    <b>Ivan1</b><br>SdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaa234234234sdSdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasdhASdfjkashdajksaasdыыыasdasddaasd
                    </div>
                    <div class="grand-child three">
                    <div class="grand-child-child">
                        19:43
                    </div>
                    <div class="grand-child-child count">
                        <div class="numberCircle">30</div>
                    </div>
                    </div>
                </div>
            </div>

            <hr class="nav_divider">


            ${this.props.isPopupChatListOpen ? '{{{PopupChatList}}}' : ''}
        `
    }
}
