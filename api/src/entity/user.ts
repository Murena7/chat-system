import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import moment from 'moment';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp' })
  updatedAt: string;

  @BeforeInsert()
  public beforeInsert() {
    const timeNowUTC = moment.utc().toISOString();
    this.createdAt = timeNowUTC;
    this.updatedAt = timeNowUTC;
  }

  @BeforeUpdate()
  public beforeUpdate() {
    const timeNowUTC = moment.utc().toISOString();
    this.updatedAt = timeNowUTC;
  }

  async hashPassword() {
    const salt = randomBytes(32);
    this.password = await argon2.hash(this.password, { salt });
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return await argon2.verify(this.password, unencryptedPassword);
  }
}
