import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addRoundsTable1683982674648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rounds",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "round_name",
            type: "varchar",
          },
          {
            name: "round_status",
            type: "enum",
            enum: ["active", "inactive"],
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
          {
            name: "round_code",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
