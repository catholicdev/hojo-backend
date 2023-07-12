import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BookSummaryResponse, SentenceChapterResponse } from "@dto";

import { Serialize, Swagger } from "@util";

import { BibleService } from "@pub/bible/bible.service";

@ApiTags("Bible")
@Controller("bible")
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get(":bookId/summary")
  @Serialize(BookSummaryResponse)
  @Swagger({ response: BookSummaryResponse })
  async bookSummary(@Param("bookId") bookId: string) {
    return this.bibleService.bookSummary(bookId);
  }

  @Get("chapter/:chapterId")
  @Serialize(SentenceChapterResponse)
  @Swagger({ response: [SentenceChapterResponse] })
  async sentenceChapter(@Param("chapterId") chapterId: string) {
    return this.bibleService.sentenceChapter(chapterId);
  }
}
