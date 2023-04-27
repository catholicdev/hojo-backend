import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GuestReloginDto {
  @ApiProperty({ format: "uuid" })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  appId: string;
}
