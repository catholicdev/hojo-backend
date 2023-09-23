import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class GetRankingResponse {
  @ApiProperty({ format: "uuid" })
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  totalScore: number;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;
}
