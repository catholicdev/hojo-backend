import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RankingService } from "./ranking.service";
import { RankingController } from "./ranking.controller";

import { GameResult } from "@game/database/entities";
import { GameResultRepository } from "@game/database/repositories";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GameResult,
            GameResultRepository
        ])
    ],
    providers: [RankingService],
    controllers: [RankingController]
})
export class RankingModule {}