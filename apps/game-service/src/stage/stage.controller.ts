import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { EndGameDto } from "@dto";

import { StageService } from "@game/stage/stage.service";

@Controller("stage")
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post("start-game")
  async startGame(@Body() message) {
    const { stageId, userId } = message;
    return this.stageService.startGame(stageId, userId);
  }

  @Post("use-help")
  async useHelp(@Body() message) {
    const { gameId, help } = message;
    return this.stageService.useHelp(gameId, help);
  }

  @Post("end-game")
  async endGame(@Body() message: EndGameDto) {
    return this.stageService.endGame(message);
  }

  @Get(":stageId/get-book")
  async getBook(@Param("stageId") stageId: string) {
    return this.stageService.getBookByStage(stageId);
  }
}
