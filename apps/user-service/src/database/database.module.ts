import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as dbEntities from "@user/database/entities";

const entities = (Object.keys(dbEntities) as Array<keyof typeof dbEntities>).map((key) => dbEntities[key]);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.USER_DATABASE_HOST,
        port: +process.env.USER_DATABASE_PORT,
        username: process.env.USER_DATABASE_USER,
        password: process.env.USER_DATABASE_PASSWORD,
        database: process.env.USER_DATABASE_NAME,
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
