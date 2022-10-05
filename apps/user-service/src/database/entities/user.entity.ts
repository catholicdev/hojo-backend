import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ name: "user_id", unique: true })
  public userId: string;

  @Column({ name: "email", unique: true })
  public email: string;

  @Column({ name: "password", nullable: true })
  public password?: string;
}
