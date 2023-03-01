import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { BibleController } from "@pub/bible/bible.controller";
import { BibleService } from "@pub/bible/bible.service";

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [BibleController],
  providers: [BibleService],
})
export class BibleModule {}
