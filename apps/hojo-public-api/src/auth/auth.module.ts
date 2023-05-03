import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "@pub/auth/auth.service";
import { FirebaseStrategy, GuestJwtStrategy, GuestStrategy } from "@pub/auth/strategies";

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET").replace(/\\n/g, "\n"),
        signOptions: {
          expiresIn: `${configService.get("JWT_EXPIRATION_TIME")}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, GuestStrategy, GuestJwtStrategy, FirebaseStrategy],
  exports: [AuthService],
})
export class AuthModule {}
