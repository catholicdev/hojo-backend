import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Book } from "./book.entity";
import { Sentence } from "./sentence.entity";

@Entity()
export class Pillar {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "book_id" })
  public bookId: string;

  @Column({ name: "pillar_title" })
  public title: string;

  @Column({ name: "pillar_sequence" })
  public sequence: number;

  @Column({ name: "from_sentence" })
  public fromSentence?: number;

  @Column({ name: "to_sentence" })
  public toSentence?: number;

  // Relationship
  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id", referencedColumnName: "bookId" })
  readonly book: Book;

  @OneToMany(() => Sentence, (sentence) => sentence.pillar)
  public sentences?: Sentence[];
}
