import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addAnswersTable1683990679215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "answers",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "question_id",
            type: "varchar",
          },
          {
            name: "answer",
            type: "text",
          },
          {
            name: "is_answer",
            type: "boolean",
          },
          {
            name: "is_show_fifty_fifty",
            type: "boolean",
          },
          {
            name: "answer_detail",
            type: "text",
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

    await queryRunner.query("CREATE INDEX QUESTION_ID_INDEX ON answers(question_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
