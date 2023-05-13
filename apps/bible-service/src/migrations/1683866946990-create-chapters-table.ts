import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createChaptersTable1683866946990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chapters",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "book_id",
            type: "varchar",
            length: "100",
          },
          {
            name: "chapter_code",
            type: "text",
            isNullable: true,
          },
          {
            name: "chapter_sequence",
            type: "int",
          },
          {
            name: "chapter_name",
            type: "text",
            isNullable: true,
          },
          {
            name: "chapter_summary",
            type: "text",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.query("CREATE INDEX BOOK_ID_INDEX ON chapters(book_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
