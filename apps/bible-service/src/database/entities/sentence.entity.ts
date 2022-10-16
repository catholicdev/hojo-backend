import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { Chapter } from "./chapter.entity";
import { Pillar } from "./pillar.entity";

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ name: "chapter_id" })
  public chapterId: string;

  @Column({ name: "pillar_id" })
  public pillarId: string;

  @Column({ name: "sentence_sequence" })
  public sequence: number;

  @Column({ name: "content" })
  public content: string;

  // Relationship
  @ManyToOne(() => Chapter)
  @JoinColumn({ name: "chapterId", referencedColumnName: "chapterId" })
  readonly chapter: Chapter;

  @ManyToOne(() => Pillar)
  @JoinColumn({ name: "pillarId", referencedColumnName: "pillarId" })
  readonly pillar: Pillar;
}
