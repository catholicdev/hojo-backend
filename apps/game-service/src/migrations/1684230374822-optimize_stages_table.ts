import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeStagesTable1684230374822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "stages",
      "round_id",
      new TableColumn({
        name: "round_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "stages",
      "book_id",
      new TableColumn({
        name: "book_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "stages",
      "stage_reward_id",
      new TableColumn({
        name: "stage_reward_id",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      "stages",
      "updated_by",
      new TableColumn({
        name: "updated_by",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.query(`CREATE INDEX ROUND_ID_INDEX ON stages(round_id)`);
    await queryRunner.query(`CREATE INDEX BOOK_ID_INDEX ON stages(book_id)`);
    await queryRunner.query(`CREATE INDEX STAGE_REWARD_ID_INDEX ON stages(stage_reward_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
