import { Injectable } from "@nestjs/common";

import { userServiceConsumer } from "@util";

import { GameResultRepository } from "@game/database/repositories";

@Injectable()
export class RankingService {
  private readonly userServiceClient = userServiceConsumer();
  constructor(private readonly gameResultRepository: GameResultRepository) {}

  async getTopOfWeek() {
    const lastWeek = new Date(Date.now() - new Date().getDay() * 24 * 60 * 60 * 1000);
    const fullDate = `${lastWeek.getFullYear()}-${lastWeek.getMonth() + 1}-${lastWeek.getDate()} 00:00:00`;

    const ranking = await this.gameResultRepository
      .createQueryBuilder("gameResults")
      .select("RANK() OVER(ORDER BY SUM(gameResults.totalScore) DESC)", "rankOrder")
      .addSelect("gameResults.userId", "userId")
      .addSelect("SUM(gameResults.totalScore)", "totalScore")
      .where("gameResults.createdDate >= DATE(:fullDate)", {
        fullDate,
      })
      .groupBy("gameResults.userId")
      .limit(20)
      .getRawMany();

    const userInforms = (await this.userServiceClient.post("user/get-user-name", {
      userIds: ranking.map((result) => {
        return result.userId;
      }),
    })) as { [key: string]: { firstName: string; lastName: string } };

    return ranking.map((result) => {
      return {
        ...result,
        ...userInforms[result.userId],
      };
    });
  }

  async getTopOfGame() {
    const ranking = await this.gameResultRepository
      .createQueryBuilder("gameResults")
      .select("RANK() OVER(ORDER BY SUM(gameResults.totalScore) DESC)", "rankOrder")
      .addSelect("gameResults.userId", "userId")
      .addSelect("SUM(gameResults.totalScore)", "totalScore")
      .groupBy("gameResults.userId")
      .limit(20)
      .getRawMany();

    const userInforms = (await this.userServiceClient.post("user/get-user-name", {
      userIds: ranking.map((result) => {
        return result.userId;
      }),
    })) as { [key: string]: { firstName: string; lastName: string } };

    return ranking.map((result) => {
      return {
        ...result,
        ...userInforms[result.userId],
      };
    });
  }
}
