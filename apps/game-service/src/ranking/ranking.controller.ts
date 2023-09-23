import { Controller, Post } from "@nestjs/common";

import { RankingService } from "./ranking.service";

@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post("get-weekly-ranking")
  async getWeeklyRanking() {
    return this.rankingService.getWeeklyRanking();
  }
}
