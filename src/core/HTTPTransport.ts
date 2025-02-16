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

export default  class HTTPTransport {
  get = (url : string, options : RequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  post = (url : string, options : RequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  put = (url : string, options : RequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  delete = (url : string, options : RequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };
  request = (url : string, options : RequestOptions = {}, timeout = 5000) => {
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
        resolve(xhr);
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
