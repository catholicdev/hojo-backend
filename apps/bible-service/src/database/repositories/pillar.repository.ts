import { EntityRepository, Repository } from "typeorm";

import { Pillar } from "@bible/database/entities";

@EntityRepository(Pillar)
export class PillarRepository extends Repository<Pillar> {}
