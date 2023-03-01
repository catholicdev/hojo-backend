import { Body, Controller, Logger, Post } from "@nestjs/common";

import { StageService } from "@game/stage/stage.service";
import { EndGameDto } from "@dto";

@Controller("stage")
export class StageController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly stageService: StageService) {}

  @Post("start-game")
  async startGame(@Body() message) {
    this.logger.log(`start-game: ${JSON.stringify(message)}`);
    const { stageId, userId } = message;
    return this.stageService.startGame(stageId, userId);
  }

  @Post("use-help")
  async useHelp(@Body() message) {
    this.logger.log(`use-help: ${JSON.stringify(message)}`);
    const { gameId, help } = message;
    return this.stageService.useHelp(gameId, help);
  }

  @Post("end-game")
  async endGame(@Body() message: EndGameDto) {
    this.logger.log(`end-game: ${JSON.stringify(message)}`);
    return this.stageService.endGame(message);
  }

  @Post("get-book")
  async getBook(@Body() message) {
    this.logger.log(`get-book: ${JSON.stringify(message)}`);
    const { stageId } = message;
    return this.stageService.getBookByStage(stageId);
  }
}
