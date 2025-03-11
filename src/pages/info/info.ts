import './info.css'

import Block, { IProps } from "../../core/block";

export interface InfoPageProps extends IProps {
    title: string;
    text?: string;
    buttonLabel: string;
    btnClick?: (e: MouseEvent) => void;
}

export default class InfoPage extends Block<InfoPageProps> {
    constructor(props: InfoPageProps) {
        super({
            ...props,
        });
    }
    public render(): string {
        return `
        <main>
            <div class="info__container">
                <h1 class="info__title">${this.props.title}</h1>
                <p class="info__text">${this.props.text}</p>
                {{{ Button label=buttonLabel className="button button__link" onClick=btnClick}}}
            </div>
        </main>
        `
    }
}
