import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class LoginResponse {
  @ApiProperty()
  @Expose()
  expiresIn: string;

  @ApiProperty()
  @Expose()
  idToken: string;

  @ApiProperty()
  @Expose()
  kind: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;

  @ApiProperty()
  @Expose()
  isNewUser: boolean;
}
