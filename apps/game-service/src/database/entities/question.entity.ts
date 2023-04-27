import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { QuestionLevelEnum } from "@type";
import { IQuestion } from "@interfaces/game";

import { Stage } from "@game/database/entities/stage.entity";
import { Answer } from "@game/database/entities/answer.entity";

@Entity("question")
export class Question implements IQuestion {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "stage_id" })
  public stageId: string;

  @Column({ name: "question", type: "text" })
  public question: string;

  @Column({ name: "question_level", type: "enum", enum: QuestionLevelEnum })
  public level: QuestionLevelEnum;

  @Column({ name: "question_score", nullable: true })
  public score?: number;

  @Column({ name: "question_sequence", nullable: false })
  public sequence: number;

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
  @ManyToOne(() => Stage)
  @JoinColumn({ name: "stage_id", referencedColumnName: "id" })
  readonly stage: Stage;

  @OneToMany(() => Answer, (answer) => answer.question)
  public answers?: Answer[];
}
