import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

import { HeartLogTypeEnum } from "@type";

export class HeartLogDto {
  @Expose()
  @ApiProperty()
  public heartId: number;

  @Expose()
  @ApiProperty()
  public currentHear: number;

  @Expose()
  @ApiProperty()
  public quantity: number;

  @Expose()
  @ApiProperty()
  public type: HeartLogTypeEnum;
}
