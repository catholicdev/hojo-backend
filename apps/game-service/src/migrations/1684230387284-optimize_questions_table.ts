import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeQuestionsTable1684230387284 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "questions",
      "stage_id",
      new TableColumn({
        name: "stage_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "questions",
      "updated_by",
      new TableColumn({
        name: "updated_by",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.query("CREATE INDEX STAGE_ID_INDEX ON questions(stage_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
