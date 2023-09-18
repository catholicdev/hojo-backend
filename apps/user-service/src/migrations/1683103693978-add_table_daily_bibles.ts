import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addTableDailyBibles1683103693978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable("daily_bibles");
    if(!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: "daily_bibles",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "user_id",
              type: "varchar",
              isNullable: false,
              length: "100",
            },
            {
              name: "book_abbreviation",
              type: "nvarchar",
              isNullable: false,
              length: "10",
            },
            {
              name: "chapter_sequence",
              type: "int",
              isNullable: false,
            },
            {
              name: "sentence_sequence",
              type: "int",
              isNullable: false,
            },
            {
              name: "sentence",
              type: "text",
              isNullable: false,
            },
            {
              name: "receive_date",
              type: "timestamp",
              isNullable: true,
              default: "CURRENT_TIMESTAMP",
            },
          ],
        })
      );

      await queryRunner.query(`CREATE INDEX USER_ID_INDEX ON daily_bibles(user_id)`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
