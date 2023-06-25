import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addColumnImageUrlOnTableRounds1687684974047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rounds",
      new TableColumn({
        name: "image_url",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
