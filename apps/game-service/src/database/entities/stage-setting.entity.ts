import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Stage } from "@game/database/entities/stage.entity";

@Entity("stage_setting")
export class StageSetting {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "stage_id" })
  public stageId: string;

  @Column({ name: "next_stage_id" })
  public nextStageId: string;

  @Column({ name: "stage_reward_id", nullable: true })
  public rewardId?: string;

  @Column("simple-json", { name: "helps", nullable: true })
  public helps: string[];

  @Column({ name: "total_question", nullable: true })
  public totalQuestion?: number;

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

  @Column({ name: "updated_by", nullable: true })
  public updatedBy?: string;

  // Relationships
  @OneToOne(() => Stage, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "stage_id", referencedColumnName: "id" })
  readonly stage!: Stage;
}
