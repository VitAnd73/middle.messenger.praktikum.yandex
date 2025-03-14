import { HOST } from "../../constants";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

type ValueOf<T> = T[keyof T];
type MethodsEnum = ValueOf<typeof METHODS>;
type RequestDataType = Document | XMLHttpRequestBodyInit | null | undefined;

interface IRequestOptions {
  headers?: { [key: string]: string };
  timeout?: number;
  data?: object;
  method?: MethodsEnum;
}

function queryStringify(data: object) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key as keyof typeof data]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export type HttpResult<R> = {
  status: number;
  data: R;
};

type HTTPMethod = <R = unknown>(
  url: string,
  options?: IRequestOptions,
  timeout?: number,
) => Promise<HttpResult<R>>;

export default class HTTPTransport {
  private apiUrl: string = "";
  constructor(apiPath: string) {
    this.apiUrl = `${HOST}${apiPath}`;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };
  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };
  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };
  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request<R = unknown>(
    url: string,
    options = {} as IRequestOptions,
    timeout = 5000,
  ): Promise<HttpResult<R>> {
    const { headers = {}, method, data } = options;
    return new Promise<HttpResult<R>>(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const isGet = method === METHODS.GET;
      xhr.open(
        method,
        isGet && !!data && !(data instanceof FormData)
          ? `${url}${queryStringify(data)}`
          : url,
      );
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = function () {
        if (
          xhr.getResponseHeader("content-type")?.includes("application/json")
        ) {
          resolve({
            status: xhr.status,
            data: JSON.parse(xhr.responseText) as R,
          });
        } else {
          resolve({
            status: xhr.status,
            data: xhr.responseText as R,
          });
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data as RequestDataType);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
