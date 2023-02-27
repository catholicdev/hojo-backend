import { Controller, Logger, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BibleService } from "@pub/bible/bible.service";

@ApiTags("Bible")
@Controller("bible")
export class BibleController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly bibleService: BibleService) {}

  @Get(":bookId/summary")
  async bookSummary(@Param("bookId") bookId: string) {
    this.logger.log(`:bookId/summary: ${bookId}`);

    return this.bibleService.bookSummary(bookId);
  }

  @Get("chapter/:chapterId")
  async sentenceChapter(@Param("chapterId") chapterId: string) {
    this.logger.log(`chapter/:chapterId: ${chapterId}`);

    return this.bibleService.sentenceChapter(chapterId);
  }
}
