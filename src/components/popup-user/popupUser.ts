import Block, { IProps } from "../../core/block";
import { createChat, getChats } from "../../services/chat";

interface IPopupUserProps extends IProps {
    popupTitle: string;
    inputField?: string;
    onOkClick: ()=> void;
    onCancelClick: ()=> void;
    onInputFieldChange?: (e: Event) => void;
}

export default class PopupUser extends Block<IPopupUserProps> {
    constructor(props: IPopupUserProps) {
        super({
            ...props,
            inputField: "",

            onInputFieldChange: (e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                this.setProps({
                    ...this.props,
                    inputField: value,
                });
            },
            onOkClick: () => {
                const title = this.props.inputField as string;
                if (title !== null) {
                    createChat(title)
                        .then(() => {
                            getChats({})
                                .then()
                                .catch((error) => console.log('create chat:', error));
                        })
                        .catch((error) => {
                            alert(`error in creating a chat: ${error}`);
                            console.log('create chat error:', error)
                        });
                }
                props.onOkClick();
            },
            onCancelClick: ()=> {
                props.onCancelClick();
            }
        });
    }

    public render(): string {
        return `<div >
            <div class="popupUserTitle">
                <p>{{popupTitle}}</p>
            </div>
            <div>
                {{{InputField
                    label = "Title нового чата"
                    inputClassName = "input__element"
                    name = "chatTitle"
                    placeholder = " "
                    value = chatTitle
                    onChange = onTitleChange
                }}}
            </div>
            <div>
                {{{Button
                    className = "button-addchat"
                    label = "OK"
                    onClick = onOkClick
                }}}
            </div>
            <div>
                {{{Button
                    className = "button-cancel"
                    label = "Отменить"
                    onClick = onCancelClick
                }}}
            </div>
        </div>`;
    }
}
