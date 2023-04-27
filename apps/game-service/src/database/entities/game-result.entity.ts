import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

import { IGameResult } from "@interfaces/game";

@Entity("game_result")
export class GameResult implements IGameResult {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id: string;

  @Column({ name: "game_code", unique: true })
  public gameCode: string;

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
