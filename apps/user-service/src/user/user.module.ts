import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository, DailyBibleRepository } from "@user/database/repositories";
import { User, DailyBible } from "@user/database/entities";

import { UserController } from "@user/user/user.controller";
import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, DailyBible, UserRepository, DailyBibleRepository])],
  controllers: [UserController],
  providers: [UserAuthenService, UserBibleService],
  exports: [UserAuthenService, UserBibleService],
})
export class UserModule {}
