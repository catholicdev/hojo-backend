import { Controller, Post, Body, Param, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Guest, Serialize } from "@util";
import { GuestInterface } from "@type";

import { GuestJwtAuthGuard } from "@pub/auth/guards";
import { GameService } from "@pub/game/game.service";
import { StageQuestionResponse, UserHelpDto } from "@dto";

@ApiTags("Game")
@Controller("game")
export class GameController {
  constructor(private readonly gameServivce: GameService) {}

  @Get("rounds")
  async getRounds() {
    return this.gameServivce.getRounds();
  }

  @Get(":roundId/stages")
  async stages(@Param("roundId") roundId: string) {
    return this.gameServivce.getStages(roundId);
  }

  @Get(":stageId/get-book")
  async getBook(@Param("stageId") stageId: string) {
    return this.gameServivce.getBook(stageId);
  }

  @Get("get-top-three")
  async getTopThree() {
    return this.gameServivce.getTopThree();
  }

  @Get(":stageId/questions")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(StageQuestionResponse)
  async getStageQuestions(@Param("stageId") stageId: string) {
    return this.gameServivce.getStageQuestions(stageId);
  }

  @Post("guest/start-game")
  @UseGuards(GuestJwtAuthGuard)
  async startGuestGame(@Guest() guest: GuestInterface, @Body() payload) {
    const { stageId } = payload;
    return this.gameServivce.startGame(guest.userId, stageId);
  }

  @Post("guest/use-help")
  @UseGuards(GuestJwtAuthGuard)
  async guestUseHelp(@Body() useHelp: UserHelpDto) {
    return this.gameServivce.guestUseHelp(useHelp);
  }

  @Post("guest/end-game")
  @UseGuards(GuestJwtAuthGuard)
  async guestEndGame(@Guest() guest: GuestInterface, @Body() payload) {
    return this.gameServivce.endGame({ ...payload, userId: guest.userId });
  }

  @Get("guest/:roundId/user-stages")
  @UseGuards(GuestJwtAuthGuard)
  async guestStages(@Guest() guest: GuestInterface, @Param("roundId") roundId: string) {
    return this.gameServivce.getUserStages(roundId, guest.userId);
  }
}
