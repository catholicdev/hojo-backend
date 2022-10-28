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
    return this.bibleService.bookSummary(bookId);
  }
}
