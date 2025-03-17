import HTTPTransport, { HttpResult } from "./httpTransport";
import sinon, { SinonStub } from "sinon";

import { assert } from "chai";

describe("HttpTransport methods", () => {
  let http: HTTPTransport;
  let stubRequest: SinonStub;

  beforeEach(() => {
    http = new HTTPTransport("/testApi");
    stubRequest = sinon
      .stub(http, "request")
      .callsFake(() =>
        Promise.resolve<HttpResult<string>>({ status: 200, data: "test data" }),
      );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Get", () => {
    http.get("/apiUrl");
    assert(stubRequest.calledWithMatch("/apiUrl"));
    assert(stubRequest.calledOnce);
  });

  it("Put", () => {
    http.put("/apiUrl");
    assert(stubRequest.calledWithMatch("/apiUrl"));
    assert(stubRequest.calledOnce);
  });

  it("Post", () => {
    http.post("/apiUrl");
    assert(stubRequest.calledWithMatch("/apiUrl"));
    assert(stubRequest.calledOnce);
  });

  it("Delete", () => {
    http.delete("/apiUrl");
    assert(stubRequest.calledWithMatch("/apiUrl"));
    assert(stubRequest.calledOnce);
  });
});
