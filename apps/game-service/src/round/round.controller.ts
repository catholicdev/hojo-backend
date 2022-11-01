import { Post, Logger, Controller, Body } from "@nestjs/common";

import { RoundService } from "./round.service";

@Controller("round")
export class RoundController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly roundService: RoundService) {}

  @Post("get-all")
  async getAllRounds() {
    this.logger.log(`get-all`);
    return this.roundService.getRounds();
  }

  @Post("stages")
  async getStages(@Body() message) {
    this.logger.log(`stages: ${JSON.stringify(message)}`);
    const { roundId } = message;

    return this.roundService.getStages(roundId);
  }
}
