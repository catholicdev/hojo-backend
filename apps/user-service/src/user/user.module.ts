import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FirebaseModule } from "@share/firebase/firebase.module";

import { DailyBible, User } from "@user/database/entities";
import { DailyBibleRepository, UserRepository } from "@user/database/repositories";
import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";
import { UserController } from "@user/user/user.controller";
import { UsersHelperService } from "@user/user/user.helper.service";
import { UserInformService } from "@user/user/user.inform.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DailyBible, UserRepository, DailyBibleRepository]),
    ConfigModule,
    HttpModule,
    FirebaseModule,
  ],
  controllers: [UserController],
  providers: [UserAuthenService, UserBibleService, UsersHelperService, UserInformService],
  exports: [UserAuthenService, UserBibleService, UsersHelperService, UserInformService],
})
export class UserModule {}
