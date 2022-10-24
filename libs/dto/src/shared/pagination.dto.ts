import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ example: 1 })
  @Min(1)
  pageIndex: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ example: 10 })
  @Min(1)
  pageSize: number;

  take?: number;
  skip?: number;
  order?: { direction?: "ASC" | "DESC"; [key: string]: string };
  customer?: any;
}
