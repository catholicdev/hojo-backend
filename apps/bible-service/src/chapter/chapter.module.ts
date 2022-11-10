import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChapterService } from '@bible/chapter/chapter.service';
import { ChapterController } from '@bible/chapter/chapter.controller';
import { SentenceModule } from '@bible/sentence/sentence.module';

import { Chapter } from '@bible/database/entities';
import { ChapterRepository } from '@bible/database/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chapter, ChapterRepository]),
    SentenceModule
  ],
  providers: [ChapterService],
  controllers: [ChapterController],
  exports: [ChapterService]
})
export class ChapterModule {}
