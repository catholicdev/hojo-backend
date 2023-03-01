import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { GameController } from "@pub/game/game.controller";
import { GameService } from "@pub/game/game.service";

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
