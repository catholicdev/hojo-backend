import { ApiProperty } from "@nestjs/swagger";

import { Transform } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsUUID, Min } from "class-validator";

export class GetRankingInGameDto {
  @ApiProperty({ required: false, description: "time in milliseconds since epoch (January 1, 1970, UTC)" })
  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @IsInt()
  @IsDateString()
  @IsOptional()
  startDate?: number;

  @ApiProperty({ required: false, description: "time in milliseconds since epoch (January 1, 1970, UTC)" })
  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @IsInt()
  @IsOptional()
  endDate?: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    if (value) return parseInt(value);
    return 1;
  })
  @Min(1)
  @IsInt()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    if (value) return parseInt(value);
    return 10;
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize: number;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  stageId?: string;
}
