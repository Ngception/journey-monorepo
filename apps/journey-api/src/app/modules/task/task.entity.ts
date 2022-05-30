import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  task_id: string;

  @Column('text')
  content: string;

  @Column('text')
  current_status: 'to do' | 'in progress' | 'done';

  @Column('uuid')
  user_id: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
