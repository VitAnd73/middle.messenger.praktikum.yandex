import Block, { IProps } from "../../core/block";

import { Chat } from "../../types/domain/chat";
import { RouteStrs } from "../../constants";
import { Router } from "../../core/routing/router";

interface IChatListProps extends IProps {
  chatList?: Chat[];
  isPopupAddChatOpen?: boolean;
  onButtonProfileClick?: () => void;
  onButtonChatListClick?: () => void;
  onPopUpChatListOkClick?: () => void;
  onPopUpChatListCancelClick?: () => void;
  onOkClick?: () => void;
}

export default class ChatList extends Block<IChatListProps> {
  constructor(props: IChatListProps) {
    super({
      ...props,
      chatList: window.store.getState().chats,
      onButtonChatListClick: () => {
        const curPopUpState = this.props?.isPopupAddChatOpen ?? false;
        this.setProps({
          ...this.props,
          isPopupAddChatOpen: !curPopUpState,
        });
      },
      onButtonProfileClick: () => {
        Router.getRouter().go(RouteStrs.Settings);
      },
      onPopUpChatListOkClick: () => {
        const curPopUpState = this.props?.isPopupAddChatOpen ?? false;
        this.setProps({
          ...this.props,
          isPopupAddChatOpen: !curPopUpState,
        });
      },
      onPopUpChatListCancelClick: () => {
        const curPopUpState = this.props?.isPopupAddChatOpen ?? false;
        this.setProps({
          ...this.props,
          isPopupAddChatOpen: !curPopUpState,
        });
      },
    });
  }

  public render(): string {
    return `<div class="sidenav">
            <div class="chatlist__profile">
              {{{Button
                className = "button__profile"
                label = "profile >>"
                onClick = onButtonProfileClick
              }}}
            </div>
            <hr class="nav_divider">
            <div class="chatlist__header">
                <input type="text" class="input__search" value placeholder="Поиск" name="search">
                {{{Button
                    className = "chatlist__search"
                    onClick = onButtonChatListClick
                }}}
            </div>
            <hr class="nav_divider">
            {{#each chatList  as |chat|}}
                {{{ ChatListItem chat=chat }}}
            {{/each}}
            ${
              this.props.isPopupAddChatOpen
                ? `{{{PopupAddChat
                    className = "popupAddChat"
                    onOkClick = onPopUpChatListOkClick
                    onCancelClick = onPopUpChatListCancelClick
                }}}`
                : ""
            }
        </div>`;
  }
}
