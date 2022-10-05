import { Module } from "@nestjs/common";

import { AppController } from "@pub/app/app.controller";
import { UsersController } from "@pub/users/users.controller";

import { AppService } from "@pub/app/app.service";
import { UsersService } from "@pub/users/users.service";

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
