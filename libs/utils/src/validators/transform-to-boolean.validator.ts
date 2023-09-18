import { Transform } from "class-transformer";

const TransformToBoolean = () => {
  const toPlain = Transform(({ value }) => value, { toPlainOnly: true });
  const toClass = (target: any, key: string) =>
    Transform(({ obj }) => valueToBoolean(obj[key]), { toClassOnly: true })(target, key);

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return Boolean(value);
  }
  if (["true", "t", "yes", "y", "1"].includes(value.toLowerCase())) {
    return true;
  }
  if (["false", "f", "no", "n", "0"].includes(value.toLowerCase())) {
    return false;
  }
  return value;
};

export { TransformToBoolean };
