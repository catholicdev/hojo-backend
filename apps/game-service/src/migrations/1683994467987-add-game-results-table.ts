import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addGameResultsTable1683994467987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "game_results",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "game_code",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "total_question_passed",
            type: "int",
            isNullable: true,
          },
          {
            name: "total_score",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            precision: null,
          },
        ],
      })
    );

    await queryRunner.query(`CREATE INDEX USER_ID_INDEX ON game_results(user_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
