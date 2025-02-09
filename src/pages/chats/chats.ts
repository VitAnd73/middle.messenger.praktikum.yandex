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
        <div class="chat__item">
          <img src="src/assets/imgs/img_avatar.png" alt="Avatar" class="chat__item__avatar">
          Ivasadfkjasd
        </div>
        <hr class="divider">
        
      </div>

      <div class="chat">
        <h2>Sidebar</h2>
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
