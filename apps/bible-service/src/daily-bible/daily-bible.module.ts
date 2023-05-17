import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DailyBibleController } from "@bible/daily-bible/daily-bible.controller";
import { DailyBibleService } from "@bible/daily-bible/daily-bible.service";
import { SentenceRepository } from "@bible/database/repositories";

@Module({
  imports: [TypeOrmModule.forFeature([SentenceRepository])],
  controllers: [DailyBibleController],
  providers: [DailyBibleService],
  exports: [DailyBibleService],
})
export class DailyBibleModule {}
