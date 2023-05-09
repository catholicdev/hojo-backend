import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IHeart } from "@interfaces";

import { HeartLog } from "@user/database/entities/heart-log.entity";
import { User } from "@user/database/entities/user.entity";

@Entity("hearts")
export class Heart extends BaseEntity implements IHeart {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Index("USER_ID_INDEX")
  @Column({ name: "user_id" })
  public userId: string;

  @Column({ name: "current_heart" })
  public currentHeart: number;

  @Column({ name: "max_heart" })
  public maxHeart: number;

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

  // Relationship
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: User;

  @OneToMany(() => HeartLog, (log) => log.heart)
  public heartLogs: HeartLog[];
}
