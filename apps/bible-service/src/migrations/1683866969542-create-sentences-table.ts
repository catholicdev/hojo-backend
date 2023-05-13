import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSentencesTable1683866969542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sentences",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "chapter_id",
            type: "varchar",
            length: "100",
          },
          {
            name: "pillar_id",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "sentence_sequence",
            type: "int",
          },
          {
            name: "content",
            type: "text",
          },
        ],
      })
    );
    await queryRunner.query("CREATE INDEX PILLAR_ID_INDEX ON sentences(pillar_id)");
    await queryRunner.query("CREATE INDEX CHAPTER_ID_INDEX ON sentences(chapter_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
