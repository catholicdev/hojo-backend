import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";

import { User } from "@user/database/entities/user.entity";

@Entity("token")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "expired_at" })
  expiredAt: Date;

  // Relationship
  @ManyToOne(() => User, (user) => user.tokens)
  public user: User;
}
