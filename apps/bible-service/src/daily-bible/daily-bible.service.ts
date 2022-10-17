import { Injectable } from "@nestjs/common";

import { SentenceRepository } from "@bible/database/repositories";

@Injectable()
export class DailyBibleService {
  constructor(private readonly sentenceRepo: SentenceRepository) {}

  async randomBibleSentence() {
    const randomBibleSentence = await this.sentenceRepo
      .createQueryBuilder("sentence")
      .leftJoinAndSelect("sentence.chapter", "chapter")
      .leftJoinAndSelect("chapter.book", "book")
      .select()
      .orderBy("RAND()")
      .getOne();

    return randomBibleSentence;
  }
}
