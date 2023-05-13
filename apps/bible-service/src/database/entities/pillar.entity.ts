import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { IPillar } from "@interfaces";

import { Book } from "@bible/database/entities/book.entity";
import { Sentence } from "@bible/database/entities/sentence.entity";

@Entity("pillars")
export class Pillar implements IPillar {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Index("BOOK_ID_INDEX")
  @Column({ name: "book_id" })
  public bookId: string;

  @Column({ name: "pillar_title", type: "text" })
  public title: string;

  @Column({ name: "pillar_sequence" })
  public sequence: number;

  @Column({ name: "from_sentence", nullable: true })
  public fromSentence?: number;

  @Column({ name: "to_sentence", nullable: true })
  public toSentence?: number;

  // Relationship
  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id", referencedColumnName: "id" })
  readonly book: Book;

  @OneToMany(() => Sentence, (sentence) => sentence.pillar)
  public sentences?: Sentence[];
}
