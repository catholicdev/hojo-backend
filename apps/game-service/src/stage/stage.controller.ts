import { Body, Controller, Logger, Post } from "@nestjs/common";

import { StageService } from "@game/stage/stage.service";

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
}
