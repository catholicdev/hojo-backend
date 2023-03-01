import { Controller, Post, Body } from '@nestjs/common';

import { ChapterService } from '@bible/chapter/chapter.service';
import { Logger } from '@nestjs/common';

@Controller('chapter')
export class ChapterController {
    private readonly logger: Logger = new Logger(this.constructor.name)
    constructor(private readonly chapterService: ChapterService){ }

    // @Post('listChapter')
    // async listChapter(@Body() body) {
    //     this.logger.log(`Getting list chapter`)
    //     const { bookId } = body;
    //     return await this.chapterSerivice.getListChapterBook(bookId);
    // }

    @Post("get-chapter-book")
    async getChapterBook(@Body() message) {
        this.logger.log(`get-book: ${JSON.stringify(message)}`)
        const { bookId } = message;
        return this.chapterService.getChapterOfBook(bookId)
    }
}
