import { HeartLogDto } from "@dto";
import { Injectable } from "@nestjs/common";

import { HeartLogRepository } from "@user/database/repositories";

@Injectable()
export class HeartLogService {
  constructor(private heartLogRepo: HeartLogRepository) {}

  async createHeartLog(heartLog: HeartLogDto) {
    const newHeartLog = this.heartLogRepo.create({
      ...heartLog,
    });

    await this.heartLogRepo.insert(newHeartLog);
  }
}
