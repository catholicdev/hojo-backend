import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@bible/app/app.controller";
import { AppService } from "@bible/app/app.service";

import { DatabaseModule } from "@bible/database/database.module";
import { DailyBibleModule } from "@bible/daily-bible/daily-bible.module";
import { BookModule } from "@bible/book/book.module";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, DailyBibleModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
