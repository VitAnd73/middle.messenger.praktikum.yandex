import { expect } from "chai";
import Block, { IProps } from "./block";
import { SinonSpy, spy } from "sinon";

interface ITestProps extends IProps {
  text?: string;
}

describe("Block", () => {
  let Component: typeof Block<ITestProps>;

  before(() => {
    class TestComponent extends Block<ITestProps> {
      constructor(props: ITestProps) {
        super({
          ...props,
        });
      }
      public render(): string {
        return `<div>
                    <p id="text-to-test">{{text}}</p>
                </div>`;
      }
    }
    Component = TestComponent;
  });

  it("Correct set up of the block", () => {
    const pageComponent = new Component({ text: "text" } as ITestProps);
    expect(pageComponent.getContent()).not.null;
  });

  it("Public methods are run", () => {
    const pageComponent = new Component({ text: "text" } as ITestProps);
    let renderSpy: SinonSpy = spy(pageComponent, "componentDidMount");
    pageComponent.componentDidMount();
    expect(renderSpy.calledOnce).to.be.true;
  });

  it("Constructor works as expected", () => {
    const text = "test text presence";
    const testComponent = new Component({ text } as ITestProps);
    const paraText =
      testComponent.element?.querySelector("#text-to-test")?.innerHTML;
    expect(paraText).to.be.eq(text);
  });

  it("Component must react/update with prop changes", () => {
    const text = "new text test value";
    const testComponent = new Component({ text: "Hello" } as ITestProps);
    testComponent.setProps({ text });
    const paraText =
      testComponent.element?.querySelector("#text-to-test")?.innerHTML;
    expect(paraText).to.be.eq(text);
  });
});
