import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostLike } from '../../../blogs/likes/infrastructure/entities/post.likes.entity';
import { CommentLike } from '../../../blogs/likes/infrastructure/entities/comment.likes.entity';
import { Comment } from '../../../blogs/comments/infrastructure/entities/comment.entity';
import { BaseEntity } from '../../../../base/base.classes/base.entity';

@Entity()
export class User extends BaseEntity {
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

  @OneToMany(() => PostLike, (postLike) => postLike.owner)
  postLikes: PostLike[];

  @OneToMany(() => CommentLike, (commentLike) => commentLike.owner)
  commentLikes: CommentLike[];

  @OneToMany(() => Comment, (comment) => comment.owner)
  comments: Comment[];
}
