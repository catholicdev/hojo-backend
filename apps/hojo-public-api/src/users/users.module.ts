import { Module } from "@nestjs/common";

import { UsersController } from "@pub/users/users.controller";
import { UsersService } from "@pub/users/users.service";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
