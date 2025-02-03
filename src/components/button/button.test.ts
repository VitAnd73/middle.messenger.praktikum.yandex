/**
 * @jest-environment jsdom
 */

import Button from './button';

describe("This is a simple button test", () => {
    const b = new Button({
        label: "labelTest",
        onClick: () => {
            alert(`button clicked`);
        }
    });

    const r = b.render();
    const element = b.getContent();

    test("Check the button click", () => {
        window.alert = jest.fn();
        element.click();
        expect(window.alert).toHaveBeenCalledWith('button clicked');
    });
    test("Check the button label", () => {
        console.log(`button label, r=${r}`);
        expect(r).toContain('label');
    });
});
