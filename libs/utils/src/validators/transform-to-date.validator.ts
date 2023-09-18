import { Transform } from "class-transformer";

import dayjs = require("dayjs");

const TransformToDate = () => {
  const toPlain = Transform(({ value }) => value, { toPlainOnly: true });
  const toClass = (target: any, key: string) =>
    Transform(({ obj }) => valueToDate(obj[key]), { toClassOnly: true })(target, key);

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToDate = (value: any) => {
  if (value === null) return null;
  if (!value) return undefined;

  let date = parseWithDayjs(value);
  if (!date) date = parseWithDate(value);

  return date;
};

const parseWithDayjs = (value: any) => {
  try {
    return dayjs(value).toDate();
  } catch {
    return null;
  }
};

const parseWithDate = (value: any) => {
  try {
    return new Date(value);
  } catch {
    return null;
  }
};

export { TransformToDate };
