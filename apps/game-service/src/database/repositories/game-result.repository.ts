import { EntityRepository, Repository } from "typeorm";

import { GameResult } from "@game/database/entities";

@EntityRepository(GameResult)
export class GameResultRepository extends Repository<GameResult> {}
