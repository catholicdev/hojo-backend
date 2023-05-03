import { Module } from "@nestjs/common";

import { AppController } from "@pub/app/app.controller";
import { AppService } from "@pub/app/app.service";
import { AuthModule } from "@pub/auth/auth.module";
import { BibleModule } from "@pub/bible/bible.module";
import { GameModule } from "@pub/game/game.module";
import { UserModule } from "@pub/user/user.module";

@Module({
  imports: [AuthModule, UserModule, BibleModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
