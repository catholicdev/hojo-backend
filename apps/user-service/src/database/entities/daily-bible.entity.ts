import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IDailyBible } from "@interfaces";

import { User } from "@user/database/entities/user.entity";

@Entity("daily_bibles")
export class DailyBible extends BaseEntity implements IDailyBible {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Index("USER_ID_INDEX")
  @Column({ name: "user_id" })
  public userId: string;

  @Column({ name: "book_abbreviation" })
  public bookAbbreviation: string;

  @Column({ name: "chapter_sequence" })
  public chapterSequence: number;

  @Column({ name: "sentence_sequence" })
  public sequence: number;

  @Column({ name: "sentence" })
  public sentence: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "receive_date",
  })
  public receiveDate: Date;

  @Column({ name: "is_favorite", default: false })
  isFavorite: boolean;

  // Relationship
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: User;
}
