import { Injectable } from "@nestjs/common";

import { GameResultRepository } from "@game/database/repositories";

@Injectable()
export class RankingService {
  constructor(private readonly gameResultRepository: GameResultRepository) {}

  async getTopThree() {
    return this.gameResultRepository
      .createQueryBuilder("gameResult")
      .select("gameResult.userId", "userId")
      .addSelect("SUM(gameResult.totalScore)", "totalScore")
      .addSelect("SUM(gameResult.totalQuestionPassed)", "totalQuestionPass")
      .addSelect("Max(gameResult.createdDate)", "date")
      .groupBy("gameResult.userId")
      .orderBy("totalScore", "DESC")
      .addOrderBy("date", "ASC")
      .limit(3)
      .getRawMany();
  }
}
