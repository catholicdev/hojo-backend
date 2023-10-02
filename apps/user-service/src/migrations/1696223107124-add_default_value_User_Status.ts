import { MigrationInterface, QueryRunner } from "typeorm";

export class addDefaultValueUserStatus1696223107124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table users alter column user_status set default 'active';`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
