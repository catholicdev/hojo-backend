import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsUUID } from "class-validator";

export class PublicEndGameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  gameId: string;

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

export class EndGameDto extends PublicEndGameDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
