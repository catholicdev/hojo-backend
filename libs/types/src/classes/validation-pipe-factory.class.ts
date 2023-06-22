import { ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

import { BusinessErrorCodeEnum } from "../enums";
import { BusinessErrorInterface } from "@interfaces";
import { BusinessException } from "./business-error.class";

const exceptionFactory: ValidationPipeOptions["exceptionFactory"] = (validationErrors) => {
  const messages = validationErrors.flatMap((validationError) => Object.values(validationError.constraints));
  const errors = messages.map<BusinessErrorInterface>((message) => ({
    code: BusinessErrorCodeEnum.VALIDATION_ERROR,
    message,
  }));

  return new BusinessException(errors);
};

const defaultOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: false,
  transformOptions: { enableImplicitConversion: true },
  exceptionFactory,
};

export class ValidationPipeFactory extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    options = { ...defaultOptions, ...options };
    super(options);
  }
}
