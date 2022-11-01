import { ApiProperty } from "@nestjs/swagger";
import { HeartLogTypeEnum } from "@type";
import { Expose } from "class-transformer";

export class HeartLogDto {
  @Expose()
  @ApiProperty()
  public heartId: string;

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
