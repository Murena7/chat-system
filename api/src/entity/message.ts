import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { User } from './user';
import moment from 'moment';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column()
  userId: string;

  @ManyToOne(type => User, user => user.messages)
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @BeforeInsert()
  public beforeInsert() {
    const timeNowUTC = moment.utc().toISOString();
    this.createdAt = timeNowUTC;
  }
}
