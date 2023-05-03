import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FirebaseModule } from "@share/firebase/firebase.module";

import { DailyBible, User } from "@user/database/entities";
import { DailyBibleRepository, TokenRepository, UserRepository } from "@user/database/repositories";
import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";
import { UserController } from "@user/user/user.controller";
import { UsersHelperService } from "@user/user/user.helper.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DailyBible, UserRepository, DailyBibleRepository, TokenRepository]),
    ConfigModule,
    HttpModule,
    FirebaseModule,
  ],
  controllers: [UserController],
  providers: [UserAuthenService, UserBibleService, UsersHelperService],
  exports: [UserAuthenService, UserBibleService, UsersHelperService],
})
export class UserModule {}
