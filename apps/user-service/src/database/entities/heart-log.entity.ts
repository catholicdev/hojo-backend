import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";

import { Heart } from "@user/database/entities/heart.entity";
import { HeartLogTypeEnum } from "@type";
import { IHeartLog } from "@interfaces/user";

@Entity("heart-log")
export class HeartLog implements IHeartLog {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "heart_id" })
  public heartId: string;

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
