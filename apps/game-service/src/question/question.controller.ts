import { Body, Controller, Post } from "@nestjs/common";

import { QuestionService } from "@game/question/question.service";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post("stage-questions")
  async getQuestions(@Body() message) {
    const { stageId } = message;
    return this.questionService.getQuestions(stageId);
  }
}
