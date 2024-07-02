import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
