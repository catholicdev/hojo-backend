import { IsInt, IsOptional, Min } from "class-validator";
import { IPaginationOptions } from "nestjs-typeorm-paginate";

export class PaginationDto implements IPaginationOptions {
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize = 10;

  get limit() {
    return this.pageSize;
  }
}
