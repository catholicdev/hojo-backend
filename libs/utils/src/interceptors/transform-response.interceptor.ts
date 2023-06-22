import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor, StreamableFile } from "@nestjs/common";

import { isNil } from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data?: T | object | object[];
}

const transform = <T>(raw?: T): SuccessResponse<T> | StreamableFile => {
  const response: SuccessResponse<T> = {
    statusCode: HttpStatus.OK,
    message: HttpStatus[HttpStatus.OK],
    data: null,
  };

  if (isNil(raw)) return response;

  if (raw instanceof StreamableFile) {
    return raw;
  }

  if (typeof raw === "string") {
    response.message = raw;
    return response;
  }

  if (!isNil(raw["message"]) && typeof raw["message"] === "string") {
    response.message = raw["message"];
    delete raw["message"];
  }

  response.data = isNil(raw["data"]) ? raw : raw["data"];

  return response;
};

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse<T> | StreamableFile> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<SuccessResponse<T> | StreamableFile> {
    return next.handle().pipe(map(transform));
  }
}
