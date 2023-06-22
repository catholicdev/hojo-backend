import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import * as dotenvConf from "dotenv";
import * as admin from "firebase-admin";

import { ExceptionHandlerInterceptor, TransformResponseInterceptor } from "@util";

import { AppModule } from "@user/app/app.module";

dotenvConf.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const configService: ConfigService<Record<string, unknown>, true> = app.get(ConfigService);

  const firebaseAdminConfig: admin.ServiceAccount = {
    projectId: configService.get<string>("FIREBASE_PROJECT_ID"),
    privateKey: configService.get<string>("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    clientEmail: configService.get<string>("FIREBASE_CLIENT_EMAIL"),
  };

  admin.initializeApp({ credential: admin.credential.cert(firebaseAdminConfig) });
  admin.firestore().settings({ ignoreUndefinedProperties: true });

  const corsOrigin = configService.get("CORS_ORIGIN");
  app.enableCors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    origin: corsOrigin ? corsOrigin.split(",") : [],
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`🚀 User Service is running on: http://localhost:${port}`);
}

bootstrap();
