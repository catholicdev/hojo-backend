import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  Index,
} from "typeorm";

import { Heart } from "@user/database/entities/heart.entity";
import { HeartLogTypeEnum } from "@type";
import { IHeartLog } from "@interfaces";

@Entity("heart_logs")
export class HeartLog extends BaseEntity implements IHeartLog {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Index("HEART_ID_INDEX")
  @Column({ name: "heart_id" })
  public heartId: number;

  @Column({ name: "current_heart" })
  public currentHear: number;

  @Column({ name: "quantity" })
  public quantity: number;

  @Column({ name: "type", type: "enum", enum: HeartLogTypeEnum })
  public type: HeartLogTypeEnum;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "created_date",
  })
  public createdDate: Date;

  // Relationship
  @ManyToOne(() => Heart)
  @JoinColumn({ name: "heart_id", referencedColumnName: "id" })
  readonly heart: Heart;
}
