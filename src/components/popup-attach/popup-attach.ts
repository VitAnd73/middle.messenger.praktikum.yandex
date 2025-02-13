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
        `
    }
}
