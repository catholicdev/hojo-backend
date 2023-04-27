import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { QuestionResponse } from "@dto";

export class StageQuestionResponse {
  @ApiProperty({ type: () => [QuestionResponse] })
  @Expose()
  public questions?: QuestionResponse[];

  @ApiProperty()
  @Expose()
  public totalQuestions?: number;
}
