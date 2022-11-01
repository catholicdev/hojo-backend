import { EntityRepository, Repository } from "typeorm";

import { HeartLog } from "@user/database/entities";

@EntityRepository(HeartLog)
export class HeartRepository extends Repository<HeartLog> {}
