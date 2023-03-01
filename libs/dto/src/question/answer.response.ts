import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AnswerResponse {
  @Expose()
  @ApiProperty()
  public id: number;

  @Expose()
  @ApiProperty()
  public answer: string;

  @Expose()
  @ApiProperty()
  public isAnswer: boolean;

  @Expose()
  @ApiProperty()
  public isShowFiftyFifty: boolean;
}
