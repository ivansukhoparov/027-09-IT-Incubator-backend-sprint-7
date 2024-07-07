import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../../posts/infrastructure/entities/post.entity';
import { BaseEntity } from '../../../../../base/base.classes/base.entity';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'character varying', nullable: false })
  public name: string;

  @Column({ type: 'character varying', nullable: false })
  public description: string;

  @Column({ type: 'character varying', nullable: false })
  public websiteUrl: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ default: false })
  public isMembership: boolean;

  @OneToMany(() => Post, (post) => post.blog)
  public posts: Post[];
}
