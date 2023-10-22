import { Injectable } from "@nestjs/common";

import * as dayjs from "dayjs";

import { GetRankingInGameDto, GetUserRankingDto } from "@dto";

import { GameResultRepository } from "@game/database/repositories";

@Injectable()
export class RankingService {
  constructor(private readonly gameResultRepository: GameResultRepository) {}

  private buildRankingInTotalQuery({
    page,
    pageSize,
    startDate,
    endDate,
    stageId,
  }: {
    page?: number;
    pageSize?: number;
    startDate?: number;
    endDate?: number;
    stageId?: string;
  }) {
    const query = this.gameResultRepository
      .createQueryBuilder("gameResult")
      .select("RANK() OVER(ORDER BY SUM(gameResult.totalScore) DESC)", "rankOrder")
      .addSelect("gameResult.userId", "userId")
      .addSelect("SUM(gameResult.totalScore)", "totalScore")
      .groupBy("gameResult.userId");

    if (page && pageSize) query.skip((page - 1) * pageSize).take(pageSize);

    if (stageId) {
      query
        .leftJoin("current_games", "currentGames", "gameResult.gameCode = currentGames.code")
        .andWhere("stage_id = :stageId", {
          stageId,
        });
    }

    if (startDate)
      query.andWhere("gameResult.createdDate >= :startDate", {
        startDate: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
      });

    if (endDate)
      query.andWhere("gameResult.createdDate <= :endDate", {
        endDate: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"),
      });

    return query;
  }

  async getRankingInGame(payload: GetRankingInGameDto) {
    const query = this.buildRankingInTotalQuery(payload);

    return query.getRawMany();
  }

  async getUserRanking(userId: string, payload: GetUserRankingDto) {
    const rankingInTotalQuery = this.buildRankingInTotalQuery(payload);

    const userRankingQuery = rankingInTotalQuery
      .createQueryBuilder()
      .from(`(${rankingInTotalQuery.getQuery()})`, "totalRanking")
      .setParameters(rankingInTotalQuery.getParameters())
      .where("totalRanking.userId = :userId", {
        userId,
      });

    return userRankingQuery.getRawOne();
  }
}
