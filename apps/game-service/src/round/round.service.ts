import { Injectable } from "@nestjs/common";

import { SystemStatusEnum } from "@type";

import { RoundRepository, StageRepository } from "@game/database/repositories";

@Injectable()
export class RoundService {
  constructor(private readonly roundRepo: RoundRepository, private readonly stageRepo: StageRepository) {}

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
    return this.stageRepo.find({ where: { roundId: roundId }, order: { stageSequence: "ASC" } });
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
