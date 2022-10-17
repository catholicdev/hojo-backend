import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { DatabaseModule } from "@bible/database/database.module";
import { DailyBibleModule } from "@bible/daily-bible/daily-bible.module";

@Module({
  imports: [DatabaseModule, DailyBibleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
