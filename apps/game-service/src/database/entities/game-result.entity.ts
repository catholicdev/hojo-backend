import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

import { IGameResult } from "@interfaces";

@Entity("game_results")
export class GameResult implements IGameResult {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id: string;

  @Column({ name: "game_code", unique: true })
  public gameCode: string;

  @Index("USER_ID_INDEX")
  @Column({ name: "user_id" })
  public userId: string;

  @Column({ name: "total_question_passed", nullable: true })
  public totalQuestionPassed?: number;

  @Column({ name: "total_score", nullable: true })
  public totalScore?: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "created_date",
  })
  public createdDate: Date;
}
