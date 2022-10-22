import { EntityRepository, Repository } from "typeorm";

import { Stage } from "@game/database/entities";

@EntityRepository(Stage)
export class StageRepository extends Repository<Stage> {}
