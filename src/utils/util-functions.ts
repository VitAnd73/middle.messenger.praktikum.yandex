import { Indexed, PlainObject } from "../types/generics";

export default function trim(str: string, chars: string = " "): string {
  if (!str) return str; // Return empty string if string is empty
  const escapedChars = chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^[${escapedChars}]+|[${escapedChars}]+$`, "g");
  return str.replace(regex, "");
}

export function makeCamelFromSnake(snakeStr: string): string {
  if (snakeStr.indexOf("_") === -1) return snakeStr;
  const curStr = snakeStr
    .split("_")
    .map((v, i) => (i === 0 ? v : `${v.charAt(0).toUpperCase()}${v.slice(1)}`))
    .join("");
  return curStr;
}

export function isEqualStrs(lhs: string, rhs: string) {
  return lhs === rhs;
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.hasOwnProperty.call(rhs, p)) {
      continue;
    }
    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(
  object: Indexed,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }),
    value as any,
  );
  return merge(object as Indexed, result);
}

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqualPlainObjects(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqualPlainObjects(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function cloneDeep<T extends Indexed>(obj: T) {
  return (function _cloneDeep(
    item: T,
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== "object") {
      return item;
    }
    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date((item as Date).valueOf());
    }
    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: ReturnType<typeof _cloneDeep>[] = [];
      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));
      return copy;
    }
    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();
      item.forEach((v) => copy.add(_cloneDeep(v)));
      return copy;
    }
    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();
      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
      return copy;
    }
    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: Indexed = {};
      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach(
        (s) => (copy[s.toString()] = _cloneDeep(item[s.toString()])),
      );
      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));
      return copy;
    }
    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error("input must be an object");
  }
  return getParams(data)
    .map((arr) => arr.join("="))
    .join("&");
}

export function strOptionalProp(prop: string, value?: string) {
  return value ? `${prop}="${value}"` : "";
}
