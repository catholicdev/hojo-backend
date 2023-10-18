import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserStatusEnum } from "@type";

import { IUser, LocationInterface } from "@interfaces";

import { DailyBible } from "@user/database/entities/daily-bible.entity";

@Entity("users")
export class User extends BaseEntity implements IUser {
  @PrimaryColumn()
  public id: string;

  @Index("FIREBASE_UID_INDEX")
  @Column({ name: "firebase_uid", unique: true })
  public firebaseUid: string;

  @Column({ name: "first_name" })
  public firstName: string;

  @Column({ name: "last_name" })
  public lastName: string;

  @Index("EMAIL_INDEX")
  @Column({ name: "email", unique: true })
  public email: string;

  @Column({ name: "password_hash" })
  public passwordHash: string;

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

  @Column({ name: "user_status", type: "enum", enum: UserStatusEnum, default: UserStatusEnum.ACTIVE })
  public userStatus: UserStatusEnum;

  @Column({ name: "device_token", nullable: true })
  public deviceToken: string;

  @Column({ name: "referred_by", nullable: true })
  public referredBy: string;

  @Column({ name: "city", nullable: true })
  public city: string;

  @Column({ name: "province", nullable: true })
  public province?: string;

  @Column("simple-json", { name: "location", nullable: true })
  public location: LocationInterface;

  @Column({ name: "birthdate", type: "date", nullable: true })
  public birthdate: Date;

  // Relationship
  @OneToMany(() => DailyBible, (daily) => daily.user)
  public dailyBibles: DailyBible[];

  public fullName: string;
}
