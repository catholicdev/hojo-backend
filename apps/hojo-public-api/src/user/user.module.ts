import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { GuestController } from "@pub/user/guest.controller";
import { UserController } from "@pub/user/user.controller";
import { UserService } from "@pub/user/user.service";

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [UserController, GuestController],
  providers: [UserService],
})
export class UserModule {}
