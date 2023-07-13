import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { bibleServiceConsumer } from "@util";

@Injectable()
export class BibleService {
  private readonly bibleServiceClient: AxiosInstance = bibleServiceConsumer();

  async bookSummary(bookId: string) {
    return this.bibleServiceClient.post("book/summary", {
      bookId,
    });
  }

  async sentenceChapter(chapterId: string) {
    return this.bibleServiceClient.post("sentence/sentence-chapter", {
      chapterId,
    });
  }
}
