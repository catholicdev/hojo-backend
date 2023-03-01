import { EntityRepository, Repository } from "typeorm";

import { Round } from "@game/database/entities";

@EntityRepository(Round)
export class RoundRepository extends Repository<Round> {}
