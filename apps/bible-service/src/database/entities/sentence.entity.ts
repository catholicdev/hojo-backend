import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { Chapter } from "@bible/database/entities/chapter.entity";
import { Pillar } from "@bible/database/entities/pillar.entity";

import { ISentence } from "@interfaces/bible";

@Entity("sentence")
export class Sentence implements ISentence {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ name: "chapter_id" })
  public chapterId: string;

  @Column({ name: "pillar_id", nullable: true })
  public pillarId: string;

  @Column({ name: "sentence_sequence" })
  public sequence: number;

  @Column({ name: "content", type: "text" })
  public content: string;

  // Relationship
  @ManyToOne(() => Chapter)
  @JoinColumn({ name: "chapter_id", referencedColumnName: "id" })
  readonly chapter: Chapter;

  @ManyToOne(() => Pillar)
  @JoinColumn({ name: "pillar_id", referencedColumnName: "id" })
  readonly pillar?: Pillar;
}
