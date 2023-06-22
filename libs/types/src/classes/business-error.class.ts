import { HttpException, HttpStatus } from "@nestjs/common";

import { BusinessErrorCodeEnum } from "../enums";
import { BusinessErrorInterface } from "@interfaces";

export class BusinessException extends HttpException {
  public errors: BusinessErrorInterface[] = null;

  constructor(error: BusinessErrorInterface);
  constructor(error: BusinessErrorInterface, status: HttpStatus);
  constructor(error: BusinessErrorInterface[]);
  constructor(error: BusinessErrorInterface[], status: HttpStatus);
  constructor(error: BusinessErrorInterface | BusinessErrorInterface[], status?: HttpStatus) {
    if (!status) status = HttpStatus.BAD_REQUEST;

    const errors = Array.isArray(error) ? error : [error];

    super({ errors }, status);

    const defaultMessage = "We're not able to process your request right now. Please try again later.";
    this.message = !Array.isArray(error) && error?.message ? error.message : defaultMessage;
    this.errors = errors;
  }
}

export const BusinessError = (code: BusinessErrorCodeEnum, message: string, status: HttpStatus) => {
  return new BusinessException({ code, message }, status);
};
