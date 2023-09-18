import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addTableHeartLogs1683104610990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable("heart_logs");
    if(!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: "heart_logs",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "heart_id",
              type: "int",
              isNullable: false,
            },
            {
              name: "current_heart",
              type: "int",
              isNullable: false,
            },
            {
              name: "quantity",
              type: "int",
              isNullable: false,
            },
            {
              name: "type",
              type: "enum",
              isNullable: true,
              enum: ["increase", "decrease"],
            },
            {
              name: "created_date",
              type: "timestamp",
              isNullable: true,
              default: "CURRENT_TIMESTAMP",
            },
          ],
        })
      );

      await queryRunner.query(`CREATE INDEX HEART_ID_INDEX ON heart_logs(heart_id)`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
