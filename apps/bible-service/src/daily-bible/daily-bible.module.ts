import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Sentence, Book, Chapter, Pillar } from "@bible/database/entities";

import { SentenceRepository } from "@bible/database/repositories";
import { DailyBibleController } from "@bible/daily-bible/daily-bible.controller";
import { DailyBibleService } from "@bible/daily-bible/daily-bible.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sentence, Book, Chapter, Pillar, SentenceRepository])],
  controllers: [DailyBibleController],
  providers: [DailyBibleService],
  exports: [DailyBibleService],
})
export class DailyBibleModule {}
