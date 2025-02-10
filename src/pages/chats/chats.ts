import Block, { PropsWithChildrenType } from "../../core/block";

// import { InputField } from "../../components/input";

// import { messageValidator } from "../../core/utils/validators";



export default class ChatsPage extends Block {
  constructor(props?: PropsWithChildrenType) {
    super("main", {
      ...props,
      // SearchField: new InputField({
      //   label: inputField.label,
      //   inputValidator: inputField.validator,
      //   inputProps: {
      //     className: "input__element",
      //     attrs: {
      //       name: "search",
      //     },
      //     events: {
      //       blur: (e: InputEvent) => {
      //         const value = (e.target as HTMLInputElement).value;
      //         const error = inputField.validator.validate(value);
      //         this.setProps({
      //           ...this.props,
      //           formState: {
      //             ...(this.props.formState as object),
      //             [inputField.name]: value,
      //           },
      //           errors: {
      //             ...(this.props.errors as object),
      //             [inputField.name]: error,
      //           }
      //         });
      //       }
      //     }
      //   }
      // }),

    });
  }
  public render(): string {
    return `
    <main>
      <div class="sidenav">
        <div class="profile">Профиль ></div>
        <div class="search__container">
          <label class="input__container">
              <input type="text" class="input__search" value placeholder="Поиск" name="search">
              <span class="input__label {{#if error}} input__error {{/if}}">{{label}}</span>
          </label>
          {{#if error}}<div class="input__error ">{{error}}</div>{{/if}}
        </div>

        <hr class="nav_divider">
        <div class="parent">
          <div class="child">
            <div class="grand-child one">
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
        <div class="parent__selected">
          <div class="child">
            <div class="grand-child one">
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
      </div>

      <div class="chat">
        <div class="chat__header">
          <div class="header__avatar">
            <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="avatar_img">
          </div>
          <div class="header__author">
            <b>Ivan</b>
          </div>
          <div class="dots"></div>
        </div>

        <div class="messages__container">
          <div class ="message__date">19 января</div>
          <div class="message__counterparty__text">
            message from the counterparty
            <div class="message__time">
              11:34
            </div>
          </div>
          <div class="message__counterparty__img">
            <img src="src/assets/imgs/counterparty_img.jpg" alt="Avatar" class="message_img">
            <div class="message__time">
              11:34
            </div>
          </div>

          <div class="message__user">
            message from the userx
            message from the userx
            message from the userx
            message from the userx
            message from the userx
            message from the userx
            message from the userx
            message from the userx
            message from the userx
            <div class="message__time">
              <svg class="reading_status" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7 .1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/></svg>
              11:34
            </div>
          </div>
        </div>



        <p>Scroll down the page to see the result.</p>
        <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
        <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
        <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
        <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
      </div>
    </main>
    `;
  }
}
