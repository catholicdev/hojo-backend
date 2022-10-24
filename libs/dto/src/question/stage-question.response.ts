import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { QuestionResponse } from "@dto";

export class StageQuestionResponse {
  @ApiProperty()
  @Expose()
  public questions?: QuestionResponse[];

  @ApiProperty()
  @Expose()
  public totalQuestions?: number;
}
