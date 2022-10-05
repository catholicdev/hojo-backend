import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { ConfigModule } from "@nestjs/config";
// import { HttpModule } from "@nestjs/axios";
// import { BullModule } from "@nestjs/bull";

// import { QueueNameConstants } from "@type";

import { UserRepository } from "@user/database/repositories";
import { User } from "@user/database/entities";

import { UserController } from "@user/user/user.controller";
import { UserAuthenService } from "@user/user/user.authen.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    // BullModule.registerQueue(
    //   { name: QueueNameConstants.CUSTOMER_QUEUE },
    //   { name: QueueNameConstants.NOTIFICATIONS_QUEUE }
    // ),
    // ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserAuthenService],
  exports: [UserAuthenService],
})
export class UserModule {}
