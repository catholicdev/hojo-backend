import { EntityRepository, Repository } from "typeorm";

import { DailyBible } from "@user/database/entities";

@EntityRepository(DailyBible)
export class DailyBibleRepository extends Repository<DailyBible> {
  async findByUserId(userId: string) {
    const userBible = await this.findOne({ where: { userId }, order: { id: "DESC" } });

    return userBible;
  }
}
