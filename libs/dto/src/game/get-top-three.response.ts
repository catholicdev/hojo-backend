import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GetTopThreeResponse {
  @ApiProperty({ format: "uuid" })
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  totalScore: number;

  @ApiProperty()
  @Expose()
  totalQuestionPass: number;

  @ApiProperty()
  @Expose()
  date: string;
}
