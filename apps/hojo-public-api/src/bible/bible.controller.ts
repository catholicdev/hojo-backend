import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import {BookSummaryResponse, FavoriteBibleSentenceDto, SentenceChapterResponse} from "@dto";

import {Serialize, Swagger, User} from "@util";

import { BibleService } from "@pub/bible/bible.service";
import {FirebaseAuthGuard} from "@pub/auth/guards";
import {AuthorizedUserInterface} from "@interfaces";

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

  @Post("sentence-favorite")
  @UseGuards(FirebaseAuthGuard)
  async upsertFavoriteBibleSentence(@User() user: AuthorizedUserInterface, @Body() payload: FavoriteBibleSentenceDto){
    return this.bibleService.upsertFavoriteBibleSentence(user.userId, payload)
  }

}
