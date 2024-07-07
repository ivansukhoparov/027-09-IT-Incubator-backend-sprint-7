import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../../blogs/infrastructure/entities/blog.entity';
import { PostLike } from '../../../likes/infrastructure/entities/post.likes.entity';
import { Comment } from '../../../comments/infrastructure/entities/comment.entity';
import { BaseEntity } from '../../../../../base/base.classes/base.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', nullable: false })
  title: string;

  @Column({ type: 'character varying', nullable: false })
  shortDescription: string;

  @Column({ type: 'character varying', nullable: false })
  content: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column()
  blogId: string;

  @ManyToOne(() => Blog, (blog) => blog.posts)
  blog: Blog;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  likes: PostLike[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
