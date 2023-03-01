import { EntityRepository, Repository } from "typeorm";

import { CurrentGame } from "@game/database/entities";

@EntityRepository(CurrentGame)
export class CurrentGameRepository extends Repository<CurrentGame> {}
