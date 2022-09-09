import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResetPasswordToken {
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  expires_at: Date;
}
