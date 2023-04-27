/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import * as winston from "winston";

import { AppModule } from "@pub/app/app.module";

import * as dotenvConf from "dotenv";
dotenvConf.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      format: winston.format.uncolorize(), //Uncolorize logs as weird character encoding appears when logs are colorized in cloudwatch.
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike()
          ),
        }),
      ],
    }),
  });
  const configService: ConfigService<Record<string, unknown>, true> = app.get(ConfigService);

  const isSwaggerEnabled = configService.get("SWAGGER_ENABLED") === "true";
  if (isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle("Hojo Public API")
      .addBearerAuth(
        {
          name: "Authorization",
          scheme: "Bearer",
          bearerFormat: "JWT",
          type: "http",
          in: "Header",
        },
        "access-token"
      )
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }

  const corsOrigin = configService.get("CORS_ORIGIN");
  app.enableCors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    origin: corsOrigin ? corsOrigin.split(",") : [],
  });

  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT;
  await app.listen(port);

  Logger.log(`🚀 Public api is running on: http://localhost:${port}`);
}

bootstrap();
