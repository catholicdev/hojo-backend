import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { QuestionController } from "@game/question/question.controller";
import { QuestionService } from "@game/question/question.service";

import { Answer, Question } from "@game/database/entities";
import { QuestionRepository, AnswerRepository } from "@game/database/repositories";

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, QuestionRepository, AnswerRepository])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
