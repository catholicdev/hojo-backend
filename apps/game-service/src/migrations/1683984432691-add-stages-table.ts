import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addStagesTable1683984432691 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "stages",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "round_id",
            type: "varchar",
          },
          {
            name: "book_id",
            type: "varchar",
          },
          {
            name: "stage_reward_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "stage_name",
            type: "varchar",
          },
          {
            name: "detail",
            type: "text",
          },
          {
            name: "total_question",
            type: "int",
          },
          {
            name: "stage_sequence",
            type: "int",
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

    await queryRunner.query(`CREATE INDEX ROUND_ID_INDEX ON stages(round_id)`);
    await queryRunner.query(`CREATE INDEX BOOK_ID_INDEX ON stages(book_id)`);
    await queryRunner.query(`CREATE INDEX STAGE_REWARD_ID_INDEX ON stages(stage_reward_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
