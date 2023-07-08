/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import * as dotenvConf from "dotenv";

import { ExceptionHandlerInterceptor, TransformResponseInterceptor } from "@util";

import { AppModule } from "@bible/app/app.module";

dotenvConf.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Record<string, unknown>, true> = app.get(ConfigService);

  const corsOrigin = configService.get("CORS_ORIGIN");

  app.enableCors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    origin: corsOrigin ? corsOrigin.split(",") : [],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalInterceptors(new ExceptionHandlerInterceptor());

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`🚀 Bible serivce is running on: http://localhost:${port}`);
}

bootstrap();
