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

        <hr class="divider">
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

        <hr class="divider">
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

        <hr class="divider">
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




      </div>

      <div class="chat">
        <div class="header">
          <div class="header__avatar">
            <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="avatar_img">
          </div>
          <div class="header__author">
            <b>Ivan</b>
          </div>
          <div class="dots"> </div>
        </div>
        
        <hr class="divider">
        
        <p>This sidebar is of full height (100%) and always shown.</p>
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
