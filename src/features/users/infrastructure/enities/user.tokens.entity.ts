import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('UserTokensMetaData')
export class UserTokensMetaData {
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
