import { Controller, Post, Body, Param, Get, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Guest } from "@util";
import { GuestInterface } from "@type";

import { GuestJwtAuthGuard } from "@pub/auth/guards";
import { GameService } from "@pub/game/game.service";

@ApiTags("Game")
@Controller("game")
export class GameController {
  constructor(private readonly gameServivce: GameService) {}

  @Get(":roundId/stages")
  async stages(@Param("roundId") roundId: string) {
    return this.gameServivce.getStages(roundId);
  }

  @Post("guest/start-game")
  @UseGuards(GuestJwtAuthGuard)
  async startGuestGame(@Guest() guest: GuestInterface, @Body() payload) {
    const { stageId } = payload;
    return this.gameServivce.startGame(guest.userId, stageId);
  }
}
