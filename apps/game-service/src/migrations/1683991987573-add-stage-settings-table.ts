import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addStageSettingsTable1683991987573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "stage_settings",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "stage_id",
            type: "varchar",
          },
          {
            name: "next_stage_id",
            type: "varchar",
          },
          {
            name: "stage_reward_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "helps",
            type: "json",
          },
          {
            name: "total_question",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            precision: null,
          },
          {
            name: "updated_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            precision: null,
          },
          {
            name: "updated_by",
            type: "varchar",
            isNullable: true,
          },
        ],
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
