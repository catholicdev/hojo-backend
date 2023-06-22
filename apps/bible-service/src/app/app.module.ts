import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { loggerMiddleware } from "@middlewares";

import { AppController } from "@bible/app/app.controller";
import { AppService } from "@bible/app/app.service";
import { BookModule } from "@bible/book/book.module";
import { ChapterModule } from "@bible/chapter/chapter.module";
import { DailyBibleModule } from "@bible/daily-bible/daily-bible.module";
import { DatabaseModule } from "@bible/database/database.module";
import { SentenceModule } from "@bible/sentence/sentence.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    DatabaseModule,
    DailyBibleModule,
    BookModule,
    ChapterModule,
    SentenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
