import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class StartGameDto {
  @ApiProperty({ format: "uuid" })
  @IsNotEmpty()
  @IsUUID()
  stageId: string;
}
