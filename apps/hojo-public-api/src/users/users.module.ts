import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { UsersController } from "@pub/users/users.controller";
import { UsersService } from "@pub/users/users.service";

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
