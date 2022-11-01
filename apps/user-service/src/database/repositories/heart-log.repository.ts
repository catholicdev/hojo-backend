import { EntityRepository, Repository } from "typeorm";

import { HeartLog } from "@user/database/entities";

@EntityRepository(HeartLog)
export class HeartLogRepository extends Repository<HeartLog> {}
