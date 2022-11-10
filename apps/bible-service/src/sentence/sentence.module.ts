import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SentenceController } from '@bible/sentence/sentence.controller';
import { SentenceService } from '@bible/sentence/sentence.service';

import { SentenceRepository } from '@bible/database/repositories';
import { Sentence } from '@bible/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sentence,
      SentenceRepository
    ])
  ],
  controllers: [SentenceController],
  providers: [SentenceService],
  exports: [SentenceService]
})
export class SentenceModule {}
