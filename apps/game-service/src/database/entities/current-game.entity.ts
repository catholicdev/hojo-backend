import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ICurrentGame } from "@interfaces";

import { Stage } from "@game/database/entities/stage.entity";

@Entity("current_games")
export class CurrentGame implements ICurrentGame {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Index("USER_ID_INDEX")
  @Column({ name: "user_id" })
  public userId: string;

  @Index("STAGE_ID_INDEX")
  @Column({ name: "stage_id" })
  public stageId: string;

  @Column({ name: "code" })
  public code: string;

  @Column("simple-json", { name: "help_used", nullable: true })
  public helpUsed?: string[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "start_date",
  })
  public startDate: Date;

  @Column({ name: "is_completed", nullable: true })
  public isCompleted: boolean;

  @Column({ type: "timestamp", name: "completed_date", nullable: true })
  public completedDate?: Date;

  @Column({ name: "is_passed", nullable: true })
  public isPassed: boolean;

  @Column({ type: "timestamp", name: "passed_date", nullable: true })
  public passedDate?: Date;

  // Relationship
  @ManyToOne(() => Stage)
  @JoinColumn({ name: "stage_id", referencedColumnName: "id" })
  readonly stage: Stage;
}
