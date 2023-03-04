import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EndGameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  gameId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ nullable: true })
  totalCorrectQuestion?: number;

  @ApiProperty({ nullable: true })
  totalScore?: number;

  @ApiProperty()
  @IsNotEmpty()
  isPassed: boolean;

  @ApiProperty()
  @IsNotEmpty()
  isCompleted: boolean;
}
