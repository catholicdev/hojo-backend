import { Body, Controller, Post } from "@nestjs/common";

import { SentenceService } from "@bible/sentence/sentence.service";

@Controller("sentence")
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Post("sentence-chapter")
  async getSentenceChapter(@Body() message) {
    const { chapterId } = message;
    return this.sentenceService.getSentenceChapter(chapterId);
  }
}
