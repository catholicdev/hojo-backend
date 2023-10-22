import { Body, Controller, Post, Query } from "@nestjs/common";

import { GetRankingInGameDto, GetUserRankingDto } from "@dto";

import { RankingService } from "./ranking.service";

@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post("get-ranking-in-game")
  async getRankingInGame(@Body() payload: GetRankingInGameDto) {
    return this.rankingService.getRankingInGame(payload);
  }

  @Post("get-user-ranking")
  async getUserRanking(@Query("userId") userId: string, @Body() payload: GetUserRankingDto) {
    return this.rankingService.getUserRanking(userId, payload);
  }
}
