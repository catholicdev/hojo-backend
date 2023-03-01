import { Body, Post, Logger, Controller } from "@nestjs/common";

import { QuestionService } from "@game/question/question.service";

@Controller("question")
export class QuestionController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly questionService: QuestionService) {}

  @Post("stage-questions")
  async getQuestions(@Body() message) {
    this.logger.log(`stage-quesitons: ${JSON.stringify(message)}`);
    const { stageId } = message;
    return this.questionService.getQuestions(stageId);
  }
}
