import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { Book } from "./book.entity";
import { Sentence } from "./sentence.entity";

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "book_id" })
  public bookId: string;

  @Column({ name: "chapter_code", nullable: true })
  public code?: string;

  @Column({ name: "chapter_sequence" })
  public sequence: string;

  @Column({ name: "chapter_name", type: "text", nullable: true })
  public name?: string;

  @Column({ name: "chapter_summary", type: "text", nullable: true })
  public summary?: string;

  // Relationship
  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id", referencedColumnName: "id" })
  readonly book: Book;

  @OneToMany(() => Sentence, (sentence) => sentence.chapter)
  public sentences?: Sentence[];
}
