import { Injectable } from "@nestjs/common";

import { RoundRepository } from "@game/database/repositories";
import { SystemStatusEnum } from "@type";

@Injectable()
export class RoundService {
  constructor(private readonly roundRepo: RoundRepository) {}

  async getRounds() {
    const rounds = await this.roundRepo.find({
      where: { status: SystemStatusEnum.ACTIVE },
      order: { roundCode: "ASC" },
    });

    return rounds.map((round) => {
      return { id: round.id, name: round.name, code: round.roundCode };
    });
  }

  async getStages(roundId: string) {
    const round = await this.roundRepo.findOne({ id: roundId }, { relations: ["stages"] });
    return round.stages;
  }

  async getUserStages(roundId: string, userId: string) {
    // Lấy danh sách theo User
    const round = await this.roundRepo
      .createQueryBuilder("round")
      .leftJoinAndSelect("round.stages", "stages")
      .leftJoinAndSelect("stages.stageSetting", "stageSetting")
      .leftJoinAndSelect("stages.currentGames", "currentGames")
      .where({ id: roundId })
      .andWhere("currentGames.userId=:userId", { userId })
      .orderBy({ "stages.stageSequence": "ASC" })
      .getOne();

    // Không có current game thì lấy không cần join với bảng Current Game
    if (!round) {
      const round = await this.roundRepo
        .createQueryBuilder("round")
        .leftJoinAndSelect("round.stages", "stages")
        .leftJoinAndSelect("stages.stageSetting", "stageSetting")
        .where({ id: roundId })
        .orderBy({ "stages.stageSequence": "ASC" })
        .getOne();

      return { stages: [round.stages[0]] };
    }

    return { stages: round.stages };
  }
}
