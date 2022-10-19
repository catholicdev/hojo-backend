import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@user/app/app.controller";
import { AppService } from "@user/app/app.service";

import { DatabaseModule } from "@user/database/database.module";
import { UserModule } from "@user/user/user.module";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
