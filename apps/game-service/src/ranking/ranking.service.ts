import { Injectable } from "@nestjs/common";

import { GameResultRepository } from "@game/database/repositories";

@Injectable()
export class RankingService {
    constructor(
        private readonly gameResultRepository: GameResultRepository
    ){ }

    async getTopThree() {
        const result = await this.gameResultRepository.createQueryBuilder("gameResult")
            .select("gameResult.userId", "userId")
            .addSelect("SUM(gameResult.totalScore)", "totalScore")
            .addSelect("SUM(gameResult.totalQuestionPassed)", "totalQuestionPass")
            .addSelect("ROW_NUMBER() OVER (ORDER BY SUM(gameResult.totalScore) DESC, gameResult.createdDate ASC)", "rank")
            .groupBy("gameResult.userId")
            .orderBy("totalScore", "DESC")
            .addOrderBy("gameResult.createdDate", "ASC")
            .limit(3)
            .getRawMany()

        return result;
    }

}