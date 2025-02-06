import './info.css'

import Block, { PropsWithChildrenType } from "../../core/block";

import { Button } from '../../components';

type InfoPageProps = {
    title: string;
    text?: string;
    buttonLabel: string
}

export default class InfoPage extends Block {
    constructor(props: InfoPageProps & PropsWithChildrenType) {
        super("main", {
            ...props,
            Button: new Button({
                className: "button button__link",
                label: props.buttonLabel,

                onClick: (e: MouseEvent) => {
                    console.log(`InfoPage clicked`);
                    window.location.href = '/';
                    e.preventDefault();
                }
            }),
        });
    }
    public render(): string {
        return `
            <div class="info__container">
                <h1 class="info__title">${this.props.title}</h1>
                <p class="info__text">${this.props.text}</p>
                {{{ Button }}}
            </div>
        `
    }
}
