import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";

import { isNil } from "lodash";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { BusinessErrorCodeEnum, BusinessException } from "@type";

import { BusinessErrorInterface } from "@interfaces";

interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: BusinessErrorInterface[];
}

@Injectable()
export class ExceptionHandlerInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          this.logError(err);
          return this.transform(err);
        })
      )
    );
  }

  logError = (err: any) => {
    const { response, stack } = err;
    let { message } = err;
    if (response) message = `${message} - ${JSON.stringify(response)}`;
    Logger.error(message, stack);
  };

  transform = (err: any): HttpException => {
    const response: ErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
      errors: null,
    };

    const { message, stack } = err;
    if (!isNil(message)) response.message = message;

    if (err instanceof HttpException) {
      const errResponse = err.getResponse();
      response.statusCode = err.getStatus();

      if (Array.isArray(errResponse?.["message"])) {
        const businessErrors = errResponse["message"].map<BusinessErrorInterface>((message) => {
          if (typeof message === "object") return message;
          return { code: BusinessErrorCodeEnum.UNKNOWN_ERROR, message };
        });
        response.errors = businessErrors;
      } else if (errResponse instanceof BusinessException) {
        response.errors = errResponse.errors;
      } else if (typeof errResponse === "object" && errResponse["errors"]) {
        response.errors = errResponse["errors"];
      }
    }

    const newErr = new HttpException(response, response.statusCode);
    newErr.stack = stack;
    return newErr;
  };
}
