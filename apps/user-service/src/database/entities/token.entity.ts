import { Column, ManyToOne, PrimaryGeneratedColumn, Entity, JoinColumn } from "typeorm";

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
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  public user: User;
}
