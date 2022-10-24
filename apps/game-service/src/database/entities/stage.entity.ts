import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { Question } from "@game/database/entities/question.entity";
import { Round } from "@game/database/entities/round.entity";
import { StageSetting } from "@game/database/entities/stage-setting.entity";

@Entity("stage")
export class Stage {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "round_id" })
  public roundId: string;

  @Column({ name: "book_id" })
  public bookId: string;

  @Column({ name: "stage_reward_id", nullable: true })
  public rewardId?: string;

  @Column({ name: "stage_name" })
  public name: string;

  @Column({ name: "detail", type: "text" })
  public detail: string;

  @Column({ name: "total_question" })
  public totalQuestion: number;

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

  // Relationship
  @ManyToOne(() => Round)
  @JoinColumn({ name: "round_id", referencedColumnName: "id" })
  readonly round: Round;

  @OneToMany(() => Question, (question) => question.stage)
  public questions?: Question[];

  @OneToOne(() => StageSetting, (setting) => setting.stage)
  public stageSetting: StageSetting;
}