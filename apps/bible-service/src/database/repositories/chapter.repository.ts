import { EntityRepository, Repository } from "typeorm";

import { Chapter } from "@bible/database/entities";

@EntityRepository(Chapter)
export class ChapterRepository extends Repository<Chapter> {}
