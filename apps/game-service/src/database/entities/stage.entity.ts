import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IStage } from "@interfaces";

import { CurrentGame } from "@game/database/entities/current-game.entity";
import { Question } from "@game/database/entities/question.entity";
import { Round } from "@game/database/entities/round.entity";
import { StageSetting } from "@game/database/entities/stage-setting.entity";

@Entity("stages")
export class Stage implements IStage {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Index("ROUND_ID_INDEX")
  @Column({ name: "round_id" })
  public roundId: string;

  @Index("BOOK_ID_INDEX")
  @Column({ name: "book_id" })
  public bookId: string;

  @Index("STAGE_REWARD_ID_INDEX")
  @Column({ name: "stage_reward_id", nullable: true })
  public rewardId?: string;

  @Column({ name: "stage_name" })
  public name: string;

  @Column({ name: "detail", type: "text" })
  public detail: string;

  @Column({ name: "total_question" })
  public totalQuestion: number;

  @Column({ name: "stage_sequence" })
  public stageSequence: number;

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

  @OneToMany(() => CurrentGame, (current) => current.stage)
  public currentGames?: CurrentGame[];

  @OneToOne(() => StageSetting, (setting) => setting.stage)
  public stageSetting: StageSetting;
}
