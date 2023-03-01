import { IsNotEmpty, IsUUID } from "class-validator";

export class EndGameDto {
  @IsNotEmpty()
  @IsUUID()
  gameId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  totalCorrectQuestion?: number;
  totalScore?: number;
  isPassed: boolean;
  isCompleted: boolean;
}
