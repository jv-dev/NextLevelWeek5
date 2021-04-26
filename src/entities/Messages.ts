import { Entity, PrimaryColumn, CreateDateColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import User from "./Users";

@Entity("messages")
export default class Messages {

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  text: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id"})
  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}