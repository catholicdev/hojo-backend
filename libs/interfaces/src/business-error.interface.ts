import { BusinessErrorCodeEnum } from "@type";

export interface BusinessErrorInterface {
  code: BusinessErrorCodeEnum;
  message: string;
}
