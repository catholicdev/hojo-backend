import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "created_date",
  })
  public createdDate: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    precision: null,
    name: "updated_date",
  })
  public updatedDate: Date;

  @Column({ name: "user_status", type: "enum", enum: UserStatusEnum })
  public userStatus: UserStatusEnum;
}
