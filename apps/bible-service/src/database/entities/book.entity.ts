import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { BookGroupEnum, BookTypeEnum } from "@type";
import { IBook } from "@interfaces/bible";

import { Chapter } from "@bible/database/entities/chapter.entity";
import { Pillar } from "@bible/database/entities/pillar.entity";

@Entity("book")
export class Book implements IBook {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "book_type", type: "enum", enum: BookTypeEnum })
  public type: BookTypeEnum;

  @Column({ name: "book_code", nullable: true })
  public code?: string;

  @Column({ name: "book_name", type: "text" })
  public name: string;

  @Column({ name: "abbreviation" })
  public abbreviation: string;

  @Column({ name: "total_chapter", nullable: true })
  public totalChapter?: number;

  @Column({ name: "total_pillar", nullable: true })
  public totalPillar?: number;

  @Column({ name: "book_summary", type: "text" })
  public summary: string;

  @Column({ name: "book_group", type: "enum", enum: BookGroupEnum })
  public group: BookGroupEnum;

  // Relationships
  @OneToMany(() => Chapter, (chapter) => chapter.book)
  public chapters?: Chapter[];

  @OneToMany(() => Pillar, (pillar) => pillar.book)
  public pillars?: Pillar[];
}
