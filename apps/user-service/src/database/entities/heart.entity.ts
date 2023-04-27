import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { IHeart } from "@interfaces/user";

import { User } from "@user/database/entities/user.entity";
import { HeartLog } from "@user/database/entities/heart-log.entity";

@Entity("heart")
export class Heart implements IHeart {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

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
