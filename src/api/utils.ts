import { ApiError } from "../types/user.ts";
import { RouteStrs } from "../constants.ts";
import { Router } from "../core/routing/router.ts";
import { HttpResult } from "./../core/transport/httpTransport";

export const responseHasError = (
  response: HttpResult<unknown>,
): response is HttpResult<ApiError> => {
  switch (response.status) {
    case 200:
      return false;
    case 500:
      Router.getRouter().go(RouteStrs.Page500);
      return false;
    default: {
      return true;
    }
  }
};
