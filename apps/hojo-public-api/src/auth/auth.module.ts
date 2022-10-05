import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { JwtStrategy, FirebaseStrategy, CustomerStrategy } from "@pub/auth/strategies";
import { AuthService } from "@pub/auth/auth.service";

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
  providers: [AuthService, JwtStrategy, FirebaseStrategy, CustomerStrategy],
  exports: [AuthService],
})
export class AuthModule {}
