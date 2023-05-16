import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeStageSettingsTable1684230420015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "stage_settings",
      "stage_id",
      new TableColumn({
        name: "stage_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "stage_settings",
      "next_stage_id",
      new TableColumn({
        name: "next_stage_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "stage_settings",
      "stage_reward_id",
      new TableColumn({
        name: "stage_reward_id",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      "stage_settings",
      "updated_by",
      new TableColumn({
        name: "updated_by",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.query("CREATE INDEX STAGE_ID_INDEX ON stage_settings(stage_id)");
    await queryRunner.query("CREATE INDEX NEXT_STAGE_ID_INDEX ON stage_settings(next_stage_id)");
    await queryRunner.query("CREATE INDEX STAGE_REWARD_ID_INDEX ON stage_settings(stage_reward_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
