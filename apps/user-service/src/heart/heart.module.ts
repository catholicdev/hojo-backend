import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { HeartLogRepository, HeartRepository } from "@user/database/repositories";
import { Heart, HeartLog } from "@user/database/entities";

import { HeartController } from "@user/heart/heart.controller";
import { HeartService } from "@user/heart/heart.service";
import { HeartLogService } from "@user/heart/heart.log.service";

@Module({
  imports: [TypeOrmModule.forFeature([Heart, HeartLog, HeartRepository, HeartLogRepository]), ConfigModule, HttpModule],
  controllers: [HeartController],
  providers: [HeartService, HeartLogService],
  exports: [HeartService],
})
export class HeartModule {}
