import { EntityRepository, Repository } from "typeorm";

import { Heart } from "@user/database/entities";

@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {}
