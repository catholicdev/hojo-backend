import { Transform } from "class-transformer";

const TransformToArray = (splitter?: string | RegExp, options?: { valueType?: "string" | "number" | "boolean" }) => {
  if (!splitter) splitter = ",";
  const toPlain = Transform(({ value }) => value, { toPlainOnly: true });
  const toClass = (target: any, key: string) =>
    Transform(({ obj }) => convertToType(valueToArray(obj[key], splitter), options?.valueType), { toClassOnly: true })(
      target,
      key
    );

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToArray = (value: any, splitter: string | RegExp) => {
  if (value === null || value === undefined) return undefined;

  if (typeof value === "string") return value.split(splitter);

  if (Array.isArray(value)) return value;

  return [value];
};

const convertToType = (arr: any[], valueType?: "string" | "number" | "boolean") => {
  if (!arr?.length) return arr;
  let convertedArr = [];

  switch (valueType) {
    case "string":
      convertedArr = arr.map((x) => String(x));
      break;

    case "number":
      convertedArr = arr.map((x) => Number(x));
      break;

    case "boolean":
      convertedArr = arr.map((x) => Boolean(x));
      break;

    default:
      convertedArr = arr;
      break;
  }

  return convertedArr;
};

export { TransformToArray };
