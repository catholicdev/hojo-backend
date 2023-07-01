import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ChapterRepository } from "@bible/database/repositories";
import { SentenceService } from "@bible/sentence/sentence.service";

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepository: ChapterRepository,
    private readonly sentenceService: SentenceService
  ) {}

  async getChapters(bookId: string) {
    const chapters = await this.chapterRepository.find({
      select: ["id", "sequence"],
      where: {
        bookId,
      },
      order: { sequence: "ASC" },
    });

    return chapters;
  }

  async getChapterOfBook(bookId: string) {
    const chapters = await this.getChapters(bookId);

    if (!chapters || chapters?.length === 0) throw new HttpException("missing-list-chapter", HttpStatus.NOT_FOUND);

    const firstChapter = await this.sentenceService.getSentenceChapter(chapters[0].id);

    if (!firstChapter || firstChapter?.length === 0)
      throw new HttpException("missing-first-chapter", HttpStatus.NOT_FOUND);

    return {
      chapters,
      firstChapter,
    };
  }
}
