import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../../blogs/infrastructure/entities/blog.entity';

@Entity()
export class Post {
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
}
