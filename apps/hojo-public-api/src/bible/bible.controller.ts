import { Controller, Logger, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BibleService } from "@pub/bible/bible.service";

import { BookSummaryResponse, SentenceChapterResponse } from "@dto";
import { Serialize, Swagger } from "@util";

@ApiTags("Bible")
@Controller("bible")
export class BibleController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly bibleService: BibleService) {}

  @Get(":bookId/summary")
  @Serialize(BookSummaryResponse)
  @Swagger({ response: BookSummaryResponse })
  async bookSummary(@Param("bookId") bookId: string) {
    this.logger.log(`:bookId/summary: ${bookId}`);

    return this.bibleService.bookSummary(bookId);
  }

  @Get("chapter/:chapterId")
  @Serialize(SentenceChapterResponse)
  @Swagger({ response: [SentenceChapterResponse] })
  async sentenceChapter(@Param("chapterId") chapterId: string) {
    this.logger.log(`chapter/:chapterId: ${chapterId}`);

    return this.bibleService.sentenceChapter(chapterId);
  }
}
