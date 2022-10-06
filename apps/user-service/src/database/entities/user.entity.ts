import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserStatusEnum } from "@types";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "app_id", unique: true })
  public appId: string;

  @Column({ name: "first_name", nullable: true })
  public firstName?: string;

  @Column({ name: "last_name", nullable: true })
  public lastName?: string;

  @Column({ name: "email", unique: true })
  public email?: string;

  @Column({ name: "password", nullable: true })
  public password?: string;

  @Column({ name: "created_date", nullable: true })
  public createdDate: Date;

  @Column({ name: "updated_date", nullable: true })
  public updatedDate: Date;

  @Column({ name: "user_status", type: "enum", enum: UserStatusEnum })
  public userStatus: UserStatusEnum;
}
