import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository } from "@user/database/repositories";
import { User } from "@user/database/entities";

import { UserController } from "@user/user/user.controller";
import { UserAuthenService } from "@user/user/user.authen.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UserController],
  providers: [UserAuthenService],
  exports: [UserAuthenService],
})
export class UserModule {}
