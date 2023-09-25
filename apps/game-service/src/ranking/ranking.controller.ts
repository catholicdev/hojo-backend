import { Controller, Post } from "@nestjs/common";

import { RankingService } from "./ranking.service";

@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post("get-top-of-week")
  async getTopOfWeek() {
    return this.rankingService.getTopOfWeek();
  }

  @Post("get-top-of-game")
  async getTopGame() {
    return this.rankingService.getTopOfGame();
  }
}
