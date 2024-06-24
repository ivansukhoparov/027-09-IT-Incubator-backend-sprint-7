import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class UserTokens {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @PrimaryColumn()
  userId: string;

  @Column()
  confirmationCodeMetaExp: string;
  @Column()
  recoveryTokenMetaExp: string;
}
