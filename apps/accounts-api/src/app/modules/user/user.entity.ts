import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
