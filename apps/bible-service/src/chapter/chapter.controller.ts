import { Body, Controller, Get, Param } from "@nestjs/common";
import { Logger } from "@nestjs/common";

import { ChapterService } from "@bible/chapter/chapter.service";

@Controller("chapter")
export class ChapterController {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly chapterService: ChapterService) {}

  // @Post('listChapter')
  // async listChapter(@Body() body) {
  //     this.logger.log(`Getting list chapter`)
  //     const { bookId } = body;
  //     return await this.chapterSerivice.getListChapterBook(bookId);
  // }

  @Get("chapter-book/:bookId")
  async getChapterBook(@Param("bookId") bookId: string) {
    return this.chapterService.getChapterOfBook(bookId);
  }
}
