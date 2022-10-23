import { Controller, Post, Body, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { GameService } from "@pub/game/game.service";

@ApiTags("Game")
@Controller("game")
export class GameController {
  constructor(private readonly gameServivce: GameService) {}

  @Post(":roundId/stages")
  async stages(@Param("roundId") roundId: string) {
    return this.gameServivce.getStages(roundId);
  }
}
