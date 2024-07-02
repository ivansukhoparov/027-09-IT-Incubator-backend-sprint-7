import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LikeStatusType } from '../../types/input';
import { User } from '../../../../users/infrastructure/enities/user.entity';
import { Comment } from '../../../comments/infrastructure/entities/comment.entity';

@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', nullable: false })
  status: LikeStatusType;

  @Column()
  postId: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => Comment, (post) => comment.likes)
  comment: Comment;

  @ManyToOne(() => User, (owner) => owner.commentLikes)
  owner: User;
}
