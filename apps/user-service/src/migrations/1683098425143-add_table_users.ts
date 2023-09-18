import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addTableUsers1683098425143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable("users");
    if(!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "varchar",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "uuid",
            },
            {
              name: "firebase_uid",
              type: "varchar",
              isNullable: false,
              length: "100",
            },
            {
              name: "first_name",
              type: "nvarchar",
              isNullable: false,
              length: "150",
            },
            {
              name: "last_name",
              type: "nvarchar",
              isNullable: false,
              length: "100",
            },
            {
              name: "email",
              type: "nvarchar",
              isNullable: false,
              length: "200",
            },
            {
              name: "password_hash",
              type: "nvarchar",
              isNullable: false,
              length: "200",
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
            {
              name: "user_status",
              type: "enum",
              isNullable: true,
              enum: ["active", "inactive", "blocked"],
            },
            {
              name: "device_token",
              type: "varchar",
              isNullable: true,
              length: "100",
            },
            {
              name: "referred_by",
              type: "varchar",
              isNullable: true,
              length: "100",
            },
            {
              name: "city",
              type: "nvarchar",
              isNullable: true,
              length: "100",
            },
            {
              name: "province",
              type: "nvarchar",
              isNullable: true,
              length: "100",
            },
            {
              name: "location",
              type: "text",
              isNullable: true,
            },
          ],
        })
      );

      await queryRunner.query(`CREATE INDEX FIREBASE_UID_INDEX ON users(firebase_uid)`);
      await queryRunner.query(`CREATE INDEX EMAIL_INDEX ON users(email)`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("We don't use this function");
  }
}
