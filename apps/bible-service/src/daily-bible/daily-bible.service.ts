import { Injectable } from "@nestjs/common";

import { SentenceRepository } from "@bible/database/repositories";

@Injectable()
export class DailyBibleService {
  constructor(private readonly sentenceRepo: SentenceRepository) {}

  async randomBibleSentence() {
    return this.sentenceRepo
      .createQueryBuilder("sentence")
      .leftJoinAndSelect("sentence.chapter", "chapter")
      .leftJoinAndSelect("chapter.book", "book")
      .select()
      .orderBy("RAND()")
      .getOne();
  }
}
