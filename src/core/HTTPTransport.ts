import constants from "../constants";

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type ValueOf<T> = T[keyof T];
type MethodsEnum = ValueOf<typeof METHODS>;
type RequestDataType = Document | XMLHttpRequestBodyInit | null | undefined;

interface RequestOptions {
  headers?: {[key: string]:string};
  timeout?: number;
  data?: object;
  method?: MethodsEnum
}

function queryStringify(data : object) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key as keyof typeof data]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type HTTPMethod = <R=unknown>(url: string, options?: RequestOptions, timeout?: number) => Promise<R>

export default  class HTTPTransport {
  private apiUrl: string = ''
  constructor(apiPath: string) {
      this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get : HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.GET}, options.timeout);
  };
  post : HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.POST}, options.timeout);
  };
  put : HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.PUT}, options.timeout);
  };
  delete : HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request : HTTPMethod = (url, options = {}, timeout = 5000) => {
    const {headers = {}, method, data} = options;
    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(
        method,
        isGet && !!data
        ? `${url}${queryStringify(data)}`
        : url,
      );
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as RequestDataType);
      }
    });
  };
}
