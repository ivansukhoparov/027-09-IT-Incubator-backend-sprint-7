import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTokens } from './user.tokens';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column({ default: new Date().toISOString() })
  createdAt: string;

  @Column({ default: false })
  isConfirmed: boolean;
}
