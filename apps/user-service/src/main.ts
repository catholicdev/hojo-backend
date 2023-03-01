import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";

import { AppModule } from "@user/app/app.module";

import * as dotenvConf from "dotenv";
dotenvConf.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`🚀 User Service is running on: http://localhost:${port}`);
}

bootstrap();
