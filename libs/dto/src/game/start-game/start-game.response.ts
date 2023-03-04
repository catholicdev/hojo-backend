import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { GameHelpEnum } from "@type";

class CurrentGame {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: [], enum: GameHelpEnum, nullable: true })
  @Expose()
  helpUsed?: GameHelpEnum[];

  @ApiProperty()
  @Expose()
  isPassed: boolean;

  @ApiProperty()
  @Expose()
  isCompleted: boolean;
}

export class StartGameResponse {
  @ApiProperty({ type: CurrentGame })
  @Expose()
  currentGame: CurrentGame;

  @ApiProperty({ type: [], enum: GameHelpEnum })
  @Expose()
  stageHelps: GameHelpEnum[];
}
