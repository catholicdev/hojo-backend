import { EntityRepository, Repository } from "typeorm";

import { Answer } from "@game/database/entities";

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {}
