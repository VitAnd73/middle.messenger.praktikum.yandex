import Block, { PropsWithChildrenType } from "../../core/block";

export default class ChatList extends Block {
    constructor(props: PropsWithChildrenType) {
        super("div", {
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string {

        return `
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
        `
    }
}
