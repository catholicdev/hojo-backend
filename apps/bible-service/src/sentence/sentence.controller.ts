import { Controller, Post, Body, Logger } from '@nestjs/common';

import { SentenceService } from '@bible/sentence/sentence.service';

@Controller("sentence")
export class SentenceController {
    private readonly logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly sentenceService: SentenceService
    ) { }

    @Post("sentence-chapter")
    async getSentenceChapter(@Body() message) {
        this.logger.log(`get sentence: ${JSON.stringify(message)}`);
        const { chapterId } = message;
        return this.sentenceService.getSentenceChapter(chapterId);
    }
}
