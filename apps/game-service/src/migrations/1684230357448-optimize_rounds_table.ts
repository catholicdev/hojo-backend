import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class optimizeRoundsTable1684230357448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "rounds",
      "round_code",
      new TableColumn({
        name: "round_code",
        type: "varchar",
      })
    );

    await queryRunner.changeColumn(
      "rounds",
      "updated_by",
      new TableColumn({
        name: "updated_by",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
