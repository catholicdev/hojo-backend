import { EntityRepository, Repository } from "typeorm";

import { Question } from "@game/database/entities";

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
