import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { CurrentGame } from "./current-game.entity";

@Entity("end_game")
export class EndGame {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id: string;

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

  @OneToOne(() => CurrentGame, (current) => current.endGame) // specify inverse side as a second parameter
  currentGame: CurrentGame;
}
