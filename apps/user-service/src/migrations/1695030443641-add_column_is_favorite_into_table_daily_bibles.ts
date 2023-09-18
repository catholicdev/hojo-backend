import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnIsFavoriteIntoTableDailyBibles1695030443641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const hasColumn = await queryRunner.hasColumn("daily_bibles","is_favorite");
      if(!hasColumn){
        await queryRunner.addColumn("daily_bibles", new TableColumn({
          name: "is_favorite",
          type: "boolean",
          isNullable: false,
          default: false
        }))}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      throw new Error("We don't use this function");
    }

}
