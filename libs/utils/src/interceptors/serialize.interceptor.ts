import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { isArray, isNumber } from "lodash";

interface IClassConstructor {
  new (...args: []): unknown;
}

export function Serialize(dto: IClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: IClassConstructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<unknown> {
    return handler.handle().pipe(map((results) => this.serialize(context, results)));
  }

  protected transform(dto, data) {
    return plainToInstance(dto, data, { excludeExtraneousValues: true });
  }

  protected serialize(context: ExecutionContext, results) {
    if (isArray(results)) {
      const [data, totalRecords] = results;

      if (isArray(data) && isNumber(totalRecords)) {
        return {
          results: this.transform(this.dto, data),
          totalRecords,
          next: SerializeInterceptor.buildNextPage(context, totalRecords),
          previous: SerializeInterceptor.buildPreviousPage(context),
        };
      }
    }

    return this.transform(this.dto, results);
  }

  private static buildNextPage(context: ExecutionContext, totalRecords: number) {
    const request = context.switchToHttp().getRequest();
    const { query, route } = request;
    const { pageIndex = 1, pageSize = 10 } = query;
    const nextPageIndex = parseInt(pageIndex, 10) + 1;
    if (nextPageIndex * pageSize > totalRecords) {
      return null;
    }
    const nextQuery = {
      ...query,
      pageIndex: nextPageIndex,
    };
    return `${route.path}?${new URLSearchParams(nextQuery).toString()}`;
  }

  private static buildPreviousPage(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { query, route } = request;
    const { pageIndex = 1 } = query;
    const isFirstPage = pageIndex === "1" || pageIndex === 1;
    if (isFirstPage) {
      return null;
    }
    const previousPage = parseInt(pageIndex, 10) - 1;
    const previousQuery = {
      ...query,
      pageIndex: previousPage,
    };
    return `${route.path}?${new URLSearchParams(previousQuery).toString()}`;
  }
}
