import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeAnswersTable1684230398366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "answers",
      "question_id",
      new TableColumn({
        name: "question_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "answers",
      "updated_by",
      new TableColumn({
        name: "updated_by",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.query("CREATE INDEX QUESTION_ID_INDEX ON answers(question_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
