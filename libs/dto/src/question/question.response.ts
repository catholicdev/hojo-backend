import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { QuestionLevelEnum } from "@type";
import { AnswerResponse } from "@dto";

export class QuestionResponse {
  @Expose()
  @ApiProperty()
  public id: number;

  @Expose()
  @ApiProperty()
  public question: string;

  @Expose()
  @ApiProperty()
  public sequence: number;

  @Expose()
  @ApiProperty()
  public score: number;

  @Expose()
  @ApiProperty({ type: "enum", enum: QuestionLevelEnum })
  public level: QuestionLevelEnum;

  @Expose()
  @ApiProperty({ type: () => [AnswerResponse] })
  public answers: AnswerResponse[];
}
