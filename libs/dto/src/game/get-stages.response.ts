import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GetStageResponse {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  roundId: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  bookId: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  rewardId: string;

  @ApiProperty()
  @Expose()
  detail: string;

  @ApiProperty()
  @Expose()
  totalQuestion: number;

  @ApiProperty()
  @Expose()
  stageSequence: number;

  @ApiProperty()
  @Expose()
  createdDate: string;

  @ApiProperty()
  @Expose()
  updatededDate: string;

  @ApiProperty()
  @Expose()
  updateBy: string;
}
