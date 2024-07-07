import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../../blogs/infrastructure/entities/blog.entity';
import { Prop } from '@nestjs/mongoose';
import { LikeStatusType } from '../../types/input';
import { Post } from '../../../posts/infrastructure/entities/post.entity';
import { User } from '../../../../users/infrastructure/enities/user.entity';
import { BaseEntity } from '../../../../../base/base.classes/base.entity';

@Entity()
export class PostLike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: string;

  @Column({ type: 'character varying', nullable: false })
  status: LikeStatusType;

  @Column()
  postId: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(() => User, (owner) => owner.postLikes)
  owner: User;
}
