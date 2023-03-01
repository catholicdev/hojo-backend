import { EntityRepository, Repository } from "typeorm";

import { Sentence } from "@bible/database/entities";

@EntityRepository(Sentence)
export class SentenceRepository extends Repository<Sentence> {}
