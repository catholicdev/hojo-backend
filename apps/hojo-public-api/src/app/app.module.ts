import { Module } from "@nestjs/common";

import { AppController } from "@pub/app/app.controller";
import { AppService } from "@pub/app/app.service";

import { UsersModule } from "@pub/users/users.module";
import { AuthModule } from "@pub/auth/auth.module";
import { BibleModule } from "@pub/bible/bible.module";

@Module({
  imports: [AuthModule, UsersModule, BibleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
