import { GameHelpEnum } from "@type";
import { IsNotEmpty } from "class-validator";

export class UserHelpDto {
  @IsNotEmpty()
  gameId: string;

  @IsNotEmpty()
  help: GameHelpEnum;
}
