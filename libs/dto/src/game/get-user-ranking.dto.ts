import { ApiProperty } from "@nestjs/swagger";

import { IsInt, IsOptional, IsUUID } from "class-validator";

export class GetUserRankingDto {
  @ApiProperty({ required: false, description: "time in milliseconds since epoch (January 1, 1970, UTC)" })
  @IsInt()
  @IsOptional()
  startDate?: number;

  @ApiProperty({ required: false, description: "time in milliseconds since epoch (January 1, 1970, UTC)" })
  @IsInt()
  @IsOptional()
  endDate?: number;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  stageId?: string;
}
