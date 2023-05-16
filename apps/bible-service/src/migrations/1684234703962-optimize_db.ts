import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeDb1684234703962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "chapters",
      "book_id",
      new TableColumn({
        name: "book_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "pillars",
      "book_id",
      new TableColumn({
        name: "book_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "sentences",
      "id",
      new TableColumn({
        name: "id",
        type: "int",
        generationStrategy: "increment",
        isGenerated: true,
        isPrimary: true,
      })
    );

    await queryRunner.changeColumn(
      "sentences",
      "chapter_id",
      new TableColumn({
        name: "chapter_id",
        type: "varchar",
        length: "36",
      })
    );

    await queryRunner.changeColumn(
      "sentences",
      "pillar_id",
      new TableColumn({
        name: "pillar_id",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.query("CREATE INDEX BOOK_ID_INDEX ON chapters(book_id)");
    await queryRunner.query("CREATE INDEX BOOK_ID_INDEX ON pillars(book_id)");
    await queryRunner.query("CREATE INDEX PILLAR_ID_INDEX ON sentences(pillar_id)");
    await queryRunner.query("CREATE INDEX CHAPTER_ID_INDEX ON sentences(chapter_id)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
