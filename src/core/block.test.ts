import { expect } from "chai";
import Block, {IProps} from "./block";

interface ITestProps extends IProps {
    text?: string,
}

describe('Block', () => {
    let Component: typeof Block<ITestProps>;

    before(() => {
        class TestComponent extends Block<ITestProps> {
            constructor(props: ITestProps) {
                super({
                    ...props
                })
            }
            protected render(): string {
                return `<div>
                    <p id="text-to-test">{{text}}</p>
                </div>`
            }
        }
        Component = TestComponent;
    });

    it('Correct set up of the block', () => {
        const pageComponent = new Component({ text: "text" } as ITestProps);
        expect(pageComponent.getContent()).not.null;
    });

    it('Constructor works as expected', () => {
        const text = 'test text presence';
        const testComponent = new Component({ text } as ITestProps);
        const paraText = testComponent.element?.querySelector('#text-to-test')?.innerHTML;
        expect(paraText).to.be.eq(text);

    });

    it('Component must react/update to prop changes', () => {
        const text = 'new text test value'
        const testComponent = new Component({text: 'Hello'} as ITestProps);
        testComponent.setProps({text})
        const paraText = testComponent.element?.querySelector('#text-to-test')?.innerHTML;
        expect(paraText).to.be.eq(text);

    });
})
