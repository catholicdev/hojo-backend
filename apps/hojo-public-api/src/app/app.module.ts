import { Module } from "@nestjs/common";

import { AppController } from "@pub/app/app.controller";
import { AppService } from "@pub/app/app.service";

import { UsersModule } from "@pub/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
