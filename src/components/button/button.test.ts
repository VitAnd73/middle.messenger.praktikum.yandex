/**
 * @jest-environment jsdom
 */

import Button from './button';

describe("This is a simple button test", () => {
    test("Check the button", () => {
        const b = new Button({});
        const r = b.render();
        console.log(`button test is set, r=${r}`);
        expect(r).toEqual('df');
    });
});
