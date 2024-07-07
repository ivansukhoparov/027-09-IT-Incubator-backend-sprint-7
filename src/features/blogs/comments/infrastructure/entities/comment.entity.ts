import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LikeStatusType } from '../../../likes/types/input';
import { Post } from '../../../posts/infrastructure/entities/post.entity';
import { User } from '../../../../users/infrastructure/enities/user.entity';
import { Prop } from '@nestjs/mongoose';
import { CommentatorInfo } from '../comments.schema';
import { CommentLike } from '../../../likes/infrastructure/entities/comment.likes.entity';
import { BaseEntity } from '../../../../../base/base.classes/base.entity';

@Entity()
export class Comment extends BaseEntity {
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

  @OneToMany(() => CommentLike, (commentLike) => commentLike.comment)
  likes: CommentLike[];
}
