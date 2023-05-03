import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addTableHearts1683104270141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "hearts",
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
            name: "current_heart",
            type: "int",
            isNullable: false,
          },
          {
            name: "max_heart",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_date",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_date",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.query(`CREATE INDEX USER_ID_INDEX ON hearts(user_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
