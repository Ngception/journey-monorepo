import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @IsEmail()
  @Column('text')
  email: string;

  @MinLength(6)
  @Column('text')
  password: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
