import Block, { IProps } from "../../core/block";

interface IPopupUserProps extends IProps {
  popupTitle: string;
  inputFieldLabel?: string;
  inputFieldValue?: string;
  onOkClick: (inputFieldValue?: string) => void;
  onCancelClick: () => void;
  onInputFieldValueChange?: (e: Event) => void;
}

export default class PopupUser extends Block<IPopupUserProps> {
  constructor(props: IPopupUserProps) {
    super({
      ...props,
      inputFieldValue: props?.inputFieldValue ?? "",

      onInputFieldValueChange: (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        this.setProps({
          ...this.props,
          inputFieldValue: value,
        });
      },
      onOkClick: () => {
        props.onOkClick(this.props.inputFieldValue);
      },
      onCancelClick: () => {
        props.onCancelClick();
      },
    });
  }

  public render(): string {
    return `<form>
            <div class="popupUserTitle">
                <p>{{popupTitle}}</p>
            </div>
            <div>
                {{{InputField
                    label = inputFieldLabel
                    inputClassName = "input__element"
                    name = "chatTitle"
                    placeholder = " "
                    value = inputFieldValue
                    onChange = onInputFieldValueChange
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
        </form>`;
  }
}
