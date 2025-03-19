import { assert, expect } from "chai";

import { APP_QUERY_SELECTOR } from "../../constants";
import { Router } from "./router";
import sinon from "sinon";

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router(APP_QUERY_SELECTOR);
  });

  describe("Router creation", () => {
    it("Created router should not be null", () => {
      expect(router).not.null;
    });

    it("Intial router path should be null", () => {
      expect(router.currentRoutePathName()).null;
    });
  });

  describe("Router methods", () => {
    it("Initially routes are null", () => {
      assert.equal(router.getRoute("/signin"), null);
    });

    it("Initializing onpopstate handler", () => {
      router.start();
      expect(window.onpopstate).not.null;
    });
  });

  describe("Router navigation", () => {
    it("Go", () => {
      const pushState = sinon.spy(window.history, "pushState");
      assert.equal(window.location.pathname, "/");
      router.go("/signin");
      assert(pushState.calledOnce);
      assert.equal(window.location.pathname, "/signin");
    });

    it("Backward", () => {
      const back = sinon.spy(window.history, "back");
      router.go("/signin");
      router.go("/sign-up");
      assert.equal(window.location.pathname, "/sign-up");
      router.back();
      assert(back.calledOnce);
    });

    it("Forward", () => {
      const forward = sinon.spy(window.history, "forward");
      router.forward();
      assert(forward.calledOnce);
    });
  });
});
