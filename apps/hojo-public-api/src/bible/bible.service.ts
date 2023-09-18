import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { FavoriteBibleSentenceDto } from "@dto";

import { bibleServiceConsumer, userServiceConsumer } from "@util";

@Injectable()
export class BibleService {
  private readonly bibleServiceClient: AxiosInstance = bibleServiceConsumer();
  private readonly userServiceClient: AxiosInstance = userServiceConsumer();

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

  async upsertFavoriteBibleSentence(userId: string, dto: FavoriteBibleSentenceDto) {
    return this.userServiceClient.post(`user/${userId}/favorite-bible-sentence`, dto);
  }
}
