import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBooksTable1683866929730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "book_type",
            type: "enum",
            enum: ["oldtestament", "newtestament"],
          },
          {
            name: "book_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "book_name",
            type: "text",
          },
          {
            name: "abbreviation",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "total_chapter",
            type: "int",
            isNullable: true,
          },
          {
            name: "total_pillar",
            type: "int",
            isNullable: true,
          },
          {
            name: "book_summary",
            type: "text",
          },
          {
            name: "book_group",
            type: "enum",
            enum: [
              "none",
              "pentateuch",
              "history",
              "wisdom",
              "prophet",
              "gospel",
              "historical_apostles",
              "epistles",
              "revelation",
            ],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
