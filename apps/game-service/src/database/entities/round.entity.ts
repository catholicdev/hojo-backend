import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { SystemStatusEnum } from "@type";
import { IRound } from "@interfaces/game";

import { Stage } from "@game/database/entities/stage.entity";

@Entity("round")
export class Round implements IRound {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "round_name" })
  public name: string;

  @Column({ name: "round_status", type: "enum", enum: SystemStatusEnum })
  public status: SystemStatusEnum;

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

  @Column({ name: "round_code", nullable: false })
  public roundCode: string;

  // Relationships
  @OneToMany(() => Stage, (stage) => stage.round)
  public stages: Stage[];
}
