import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationResultInterface } from "@interfaces";

export class Pagination<T> {
  public results: T[];
  public totalRecords: number;

  constructor(paginationResults: PaginationResultInterface<T>) {
    this.results = paginationResults.results;
    this.totalRecords = paginationResults.totalRecords;
  }
}

export function StandardizedList<T>(type: Type<T>): Type<PaginationResultInterface<T>> {
  class Response<PaginationEntity> implements PaginationResultInterface<PaginationEntity> {
    @ApiProperty({ type, isArray: true })
    results!: PaginationEntity[];

    @ApiProperty()
    totalRecords!: number;

    @ApiProperty()
    next?: string;

    @ApiProperty()
    previous?: string;
  }

  Object.defineProperty(Response, "name", {
    value: `${type.name}List`,
  });

  return Response;
}
