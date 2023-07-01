import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Round } from "@game/database/entities";
import { RoundRepository, StageRepository } from "@game/database/repositories";
import { RoundController } from "@game/round/round.controller";
import { RoundService } from "@game/round/round.service";

@Module({
  imports: [TypeOrmModule.forFeature([Round, RoundRepository, StageRepository])],
  controllers: [RoundController],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}
