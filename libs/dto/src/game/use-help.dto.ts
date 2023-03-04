import { GameHelpEnum } from "@type";
import { IsNotEmpty, IsEnum, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserHelpDto {
  @ApiProperty({ format: "uuid" })
  @IsNotEmpty()
  @IsUUID()
  gameId: string;

  @ApiProperty({ type: "enum", enum: GameHelpEnum })
  @IsNotEmpty()
  @IsEnum(GameHelpEnum)
  help: GameHelpEnum;
}
