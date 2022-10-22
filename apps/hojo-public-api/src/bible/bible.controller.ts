import { Controller, Body, Post, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BibleService } from "@pub/bible/bible.service";

@ApiTags("Bible")
@Controller("bible")
export class BibleController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly bibleService: BibleService) {}

  @Post("book/summary")
  async bookSummary(@Body() payload) {
    const { bookId } = payload;
    return this.bibleService.bookSummary(bookId);
  }
}
