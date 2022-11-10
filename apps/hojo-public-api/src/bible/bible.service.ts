import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { bibleServiceConsumer } from "@util";

@Injectable()
export class BibleService {
  private readonly bibleServiceClient: AxiosInstance = bibleServiceConsumer();

  async bookSummary(bookId: string) {
    const result = await this.bibleServiceClient.post("book/summary", {
      bookId,
    });
    return result.data;
  }

  async sentenceChapter(chapterId: string) {
    const result = await this.bibleServiceClient.post("sentence/sentence-chapter", {
      chapterId
    })
    return result.data;
  }
}
