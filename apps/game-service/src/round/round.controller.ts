import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { RoundService } from "./round.service";

@Controller("round")
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Get("get-all")
  async getAllRounds() {
    return this.roundService.getRounds();
  }

  @Get(":roundId/stages")
  async getStages(@Param("roundId") roundId: string) {
    return this.roundService.getStages(roundId);
  }

  @Post("user-stages")
  async getUserStages(@Body() message) {
    const { roundId, userId } = message;

    return this.roundService.getUserStages(roundId, userId);
  }
}
