import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@game/app/app.controller";
import { AppService } from "@game/app/app.service";

import { DatabaseModule } from "@game/database/database.module";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
