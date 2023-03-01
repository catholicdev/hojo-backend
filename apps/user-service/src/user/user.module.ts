import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { UserRepository, DailyBibleRepository, TokenRepository } from "@user/database/repositories";
import { User, DailyBible } from "@user/database/entities";

import { UserController } from "@user/user/user.controller";
import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";
import { UsersHelperService } from "@user/user/user.helper.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DailyBible, UserRepository, DailyBibleRepository, TokenRepository]),
    ConfigModule,
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserAuthenService, UserBibleService, UsersHelperService],
  exports: [UserAuthenService, UserBibleService, UsersHelperService],
})
export class UserModule {}
