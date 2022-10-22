import { EntityRepository, Repository } from "typeorm";

import { EndGame } from "@game/database/entities";

@EntityRepository(EndGame)
export class EndGameRepository extends Repository<EndGame> {}
