import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeCurrentGamesTable1684230432584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "current_games",
      "user_id",
      new TableColumn({
        name: "user_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "current_games",
      "stage_id",
      new TableColumn({
        name: "stage_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.query(`CREATE INDEX USER_ID_INDEX ON current_games(user_id)`);
    await queryRunner.query(`CREATE INDEX STAGE_ID_INDEX ON current_games(stage_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
