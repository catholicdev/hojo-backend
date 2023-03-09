import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { IAnswer } from "@interfaces/game";

import { Question } from "@game/database/entities/question.entity";

@Entity("answer")
export class Answer implements IAnswer {
  @PrimaryGeneratedColumn("increment")
  public id: string;

  @Column({ name: "question_id" })
  public questionId: string;

  @Column({ name: "answer", type: "text" })
  public answer: string;

  @Column({ name: "is_answer" })
  public isAnswer: boolean;

  @Column({ name: "is_show_fifty_fifty" })
  public isShowFiftyFifty: boolean;

  @Column({ name: "answer_detail", type: "text", nullable: true })
  public answerDetail?: string;

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
  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id", referencedColumnName: "id" })
  readonly question: Question;
}
