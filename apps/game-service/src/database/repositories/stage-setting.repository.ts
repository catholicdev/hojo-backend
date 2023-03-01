import { EntityRepository, Repository } from "typeorm";

import { StageSetting } from "@game/database/entities";

@EntityRepository(StageSetting)
export class StageSettingRepository extends Repository<StageSetting> {}
