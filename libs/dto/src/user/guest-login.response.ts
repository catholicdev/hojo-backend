import { ApiProperty, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GuestLoginResponse {
  @ApiProperty()
  @Expose()
  token: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  appId: string;
}

export class GuestReloginResponse extends PickType(GuestLoginResponse, ["token"]) {}
