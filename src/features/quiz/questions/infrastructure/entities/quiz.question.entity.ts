import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuizQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public body: string;

  @Column({ type: 'json' })
  public correctAnswers: string;

  @Column({ default: false })
  public published: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public updatedAt: Date;
}
