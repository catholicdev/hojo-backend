import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class EndGameResponse {
  @ApiProperty({ format: "uuid" })
  @Expose()
  nextStageId: string;
}
