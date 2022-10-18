import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as dbEntities from "@bible/database/entities";

const entities = (Object.keys(dbEntities) as Array<keyof typeof dbEntities>).map((key) => dbEntities[key]);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.BIBLE_DATABASE_HOST,
        port: +process.env.BIBLE_DATABASE_PORT,
        username: process.env.BIBLE_DATABASE_USER,
        password: process.env.BIBLE_DATABASE_PASSWORD,
        database: process.env.BIBLE_DATABASE_NAME,
        synchronize: !!process.env.AUTO_SYNC,
        keepConnectionAlive: true,
        logging: !!process.env.LOG_SQL,
        entities,
      }),
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
