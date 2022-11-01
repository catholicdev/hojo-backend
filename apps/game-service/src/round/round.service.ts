import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { RoundRepository } from "@game/database/repositories";
import { SystemStatusEnum } from "@type";

@Injectable()
export class RoundService {
  constructor(private readonly roundRepo: RoundRepository) {}

  async getRounds() {
    return this.roundRepo.find({
      where: { status: SystemStatusEnum.ACTIVE },
      order: { roundCode: "ASC" },
    });
  }

  async getStages(roundId: string) {
    const round = await this.roundRepo.findOne({ id: roundId }, { relations: ["stages"] });
    return round.stages;
  }
}
