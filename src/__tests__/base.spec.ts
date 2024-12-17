// import { InputField } from "../components/input";

import { tryTest } from "../components/input";

describe("This is a simple test", () => {
    test("Check the sampleFunction function", () => {
        console.log(`test is set`);
        expect(tryTest()).toEqual("done");
    });
});
