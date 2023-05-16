import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeGameResultsTable1684230447513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "game_results",
      "user_id",
      new TableColumn({
        name: "user_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.query(`CREATE INDEX USER_ID_INDEX ON game_results(user_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
