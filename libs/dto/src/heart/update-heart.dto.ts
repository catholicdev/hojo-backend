import { ApiProperty } from "@nestjs/swagger";
import { HeartLogTypeEnum } from "@type";
import { Expose } from "class-transformer";

export class UpdateHeartDto {
  @Expose()
  @ApiProperty()
  public userId: string;

  @Expose()
  @ApiProperty()
  public quantity: number;

  @Expose()
  @ApiProperty()
  public type: HeartLogTypeEnum;
}
