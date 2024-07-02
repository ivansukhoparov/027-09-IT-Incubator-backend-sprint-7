import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LikeStatusType } from '../../../likes/types/input';
import { Post } from '../../../posts/infrastructure/entities/post.entity';
import { User } from '../../../../users/infrastructure/enities/user.entity';
import { Prop } from '@nestjs/mongoose';
import { CommentatorInfo } from '../comments.schema';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: string;

  @Column({ type: 'character varying', nullable: false })
  content: string;

  @Column()
  postId: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (owner) => owner.comments)
  owner: User;
}
