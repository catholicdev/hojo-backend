import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPillarsTable1683866956240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pillars",
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
          },
          {
            name: "pillar_title",
            type: "text",
          },
          {
            name: "pillar_sequence",
            type: "int",
          },
          {
            name: "from_sentence",
            type: "int",
            isNullable: true,
          },
          {
            name: "to_sentence",
            type: "int",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.query("CREATE INDEX BOOK_ID_INDEX ON pillars(book_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
