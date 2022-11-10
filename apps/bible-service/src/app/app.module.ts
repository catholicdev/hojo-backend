import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@bible/app/app.controller";
import { AppService } from "@bible/app/app.service";

import { DatabaseModule } from "@bible/database/database.module";
import { DailyBibleModule } from "@bible/daily-bible/daily-bible.module";
import { BookModule } from "@bible/book/book.module";
import { ChapterModule } from "@bible/chapter/chapter.module";
import { SentenceModule } from "@bible/sentence/sentence.module";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, DailyBibleModule, BookModule, ChapterModule, SentenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
