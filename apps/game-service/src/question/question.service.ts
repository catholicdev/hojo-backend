import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { Pagination } from "@dto";

import { QuestionRepository } from "@game/database/repositories";
import { Question } from "@game/database/entities";

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepo: QuestionRepository) {}

  async getQuestions(stageId: string) {
    if (!stageId) throw new HttpException("incorrect-input", HttpStatus.BAD_REQUEST);

    const [results, totalRecords] = await this.questionRepo
      .createQueryBuilder("question")
      .leftJoinAndSelect("question.answers", "answers")
      .select([
        "question.id",
        "question.question",
        "question.sequence",
        "question.score",
        "answers.id",
        "answers.answer",
        "answers.isAnswer",
        "answers.isShowFiftyFifty",
      ])
      .where({ stageId: stageId })
      .getManyAndCount();

    return { questions: results, totalQuestions: totalRecords };
  }
}
