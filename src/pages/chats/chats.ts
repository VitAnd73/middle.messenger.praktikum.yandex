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
      </div>

      <div class="chat__container">
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
            <p>counterparty</p>
            <p>counterparty</p>
            <div class="message__time">
              11:34
            </div>
          </div>

          <div class="message__user">
            message from the userx
            <div class="message__time">
              <svg class="reading_status" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7 .1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/></svg>
              11:34
            </div>
          </div>

          <div class="message__counterparty__img">
            <img src="src/assets/imgs/counterparty_img.jpg" alt="Avatar" class="message_img">
            <div class="message__time">
              11:34
            </div>
          </div>


          
          </div>
          
          <div class="popup">
            <div>
              <span class="popup__item__icon">
                <svg width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M63.9 159v706h896.2V159H63.9z m852.2 662H107.9v-11.6l193.6-193.6 118.8 118.8 11.3 11.3 11.3-11.3 323-323 150.2 150.2V821z m0-281.9L765.9 388.9 431.6 723.3 301.5 593.1 107.9 786.7V203h808.2v336.1z" fill="#1263ba"></path><path d="M306.7 446.9c-43.6 0-79.1-35.5-79.1-79.1s35.5-79.1 79.1-79.1c43.6 0 79.1 35.5 79.1 79.1s-35.5 79.1-79.1 79.1z m0-142.2c-34.8 0-63.1 28.3-63.1 63.1s28.3 63.1 63.1 63.1 63.1-28.3 63.1-63.1-28.3-63.1-63.1-63.1z" fill="#1263ba"></path><path d="M306.3 252.3m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M248.6 267.9m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M206.4 310.4m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M191.1 368.2m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M206.8 425.9m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M249.2 468m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M307 483.3m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M364.8 467.7m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M406.9 425.2m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M422.2 367.4m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M406.5 309.7m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path><path d="M364.1 267.6m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="#1263ba"></path></g></svg>
              </span>
              <span class="popup__item__text">Фото или видео</span>
            </div>
            <div>
              <span class="popup__item__icon">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M19.2686 19.2686L21 21M20 17.5C20 18.8807 18.8807 20 17.5 20C16.1193 20 15 18.8807 15 17.5C15 16.1193 16.1193 15 17.5 15C18.8807 15 20 16.1193 20 17.5Z" stroke="#1263ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </span>
              <span class="popup__item__text">Файл</span>
            </div>
            <div>
              <span class="popup__item__icon">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#1263ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </span>
              <span class="popup__item__text">Локация</span>
            </div>

          </div>


          <div class="chat__footer">
            <div>
              <svg class="attach_svg" fill="currentColor" viewBox="0 0 950 950" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M857.7,141.3c-30.1-30.1-65.1-53.5-104.3-69.4c-37.8-15.3-77.7-23.2-118.7-23.2c-40.9,0-80.9,7.7-118.7,22.9 c-39.1,15.8-74.2,38.9-104.3,68.8L73.1,478.3C49.3,501.9,30.9,529.4,18.3,560.2C6.2,589.9,0,621.3,0,653.6 C0,685.7,6.1,717,18.1,746.7c12.4,30.7,30.7,58.2,54.3,81.899c23.6,23.7,51.2,42,81.9,54.5c29.7,12.101,61.1,18.2,93.3,18.2 c32.2,0,63.6-6.1,93.3-18.1c30.8-12.5,58.399-30.8,82.1-54.4l269.101-268c17.3-17.2,30.6-37.3,39.699-59.7 c8.801-21.6,13.2-44.5,13.2-67.899c0-48.2-18.8-93.2-52.899-127c-34-34.2-79.2-53.1-127.301-53.3c-48.199-0.1-93.5,18.6-127.6,52.7 L269.6,473.3c-8.5,8.5-13.1,19.7-13.1,31.601c0,11.899,4.6,23.199,13.1,31.6l0.7,0.7c17.4,17.5,45.8,17.5,63.3,0.1l168-167.5 c35.1-34.8,92.1-35,127.199-0.399c16.9,16.8,26.101,39.3,26.101,63.399c0,24.3-9.4,47.101-26.5,64.101l-269,268 c-0.5,0.5-0.9,0.899-1.2,1.5c-29.7,28.899-68.9,44.699-110.5,44.5c-41.9-0.2-81.2-16.5-110.6-46c-14.7-15-26.1-32.5-34-52 C95.5,694,91.7,674,91.7,653.6c0-41.8,16.1-80.899,45.4-110.3c0.4-0.3,0.7-0.6,1.1-0.899l337.9-337.8c0.3-0.3,0.6-0.7,0.899-1.1 c21.4-21,46.3-37.4,74-48.5c27-10.8,55.4-16.2,84.601-16.2c29.199,0,57.699,5.6,84.6,16.4c27.9,11.3,52.9,27.8,74.3,49.1 c21.4,21.4,37.9,46.4,49.2,74.3c10.9,26.9,16.4,55.4,16.4,84.6c0,29.3-5.5,57.9-16.5,85c-11.301,28-28,53.2-49.5,74.8l-233.5,232.8 c-8.5,8.5-13.2,19.7-13.2,31.7s4.7,23.2,13.1,31.6l0.5,0.5c17.4,17.4,45.8,17.4,63.2,0L857.5,586.9 C887.601,556.8,911,521.7,926.9,482.6C942.3,444.8,950,404.9,950,363.9c0-40.9-7.8-80.8-23.1-118.5 C911.101,206.3,887.8,171.3,857.7,141.3z"></path> </g> </g></svg>
            </div>
            <div>
              <input type="text" class="input__message" value placeholder="Сообщение" name="message">
            </div>
            <div class="button_container">
              <button class="button-send"/>
            </div>
          </div>

      </div>
    </main>
    `;
  }
}
