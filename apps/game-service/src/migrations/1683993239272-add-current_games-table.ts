import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addCurrentGamesTable1683993239272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "current_games",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "stage_id",
            type: "varchar",
          },
          {
            name: "code",
            type: "varchar",
          },
          {
            name: "help_used",
            type: "json",
            isNullable: true,
          },
          {
            name: "start_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            precision: null,
          },
          {
            name: "is_completed",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "completed_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "is_passed",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "passed_date",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.query(`CREATE INDEX USER_ID_INDEX ON current_games(user_id)`);
    await queryRunner.query(`CREATE INDEX STAGE_ID_INDEX ON current_games(stage_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
