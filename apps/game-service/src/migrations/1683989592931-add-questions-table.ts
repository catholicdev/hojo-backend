import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addQuestionsTable1683989592931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "questions",
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
            name: "question",
            type: "text",
          },
          {
            name: "question_level",
            type: "enum",
            enum: ["easy", "medium", "hard"],
          },
          {
            name: "question_score",
            type: "int",
            isNullable: true,
          },
          {
            name: "question_sequence",
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

    await queryRunner.query("CREATE INDEX STAGE_ID_INDEX ON questions(stage_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
