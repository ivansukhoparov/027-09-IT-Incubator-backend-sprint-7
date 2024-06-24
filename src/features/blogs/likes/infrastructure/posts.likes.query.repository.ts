import { LikeStatusType, NewestLikeType } from '../types/input';
import { InjectModel } from '@nestjs/mongoose';
import { PostsLikes, PostsLikesDocument } from './likes.schema';
import { Model } from 'mongoose';
import { PostsLikesInfoType } from '../../posts/types/mapper';

export class PostsLikesQueryRepository {
  constructor(@InjectModel(PostsLikes.name) private postsLikesModel: Model<PostsLikes>) {}

  async getLikes(postId: string, userId?: string): Promise<PostsLikesInfoType> {
    let likeStatus: LikeStatusType = 'None';

    if (userId) {
      const userLike = await this.postsLikesModel.findOne({ $and: [{ postId: postId }, { likeOwnerId: userId }] }).lean();
      if (userLike) {
        likeStatus = userLike.status;
      }
    }

    const likesCount = await this.postsLikesModel.countDocuments({
      $and: [{ postId: postId }, { status: 'Like' }],
    });
    const dislikesCount = await this.postsLikesModel.countDocuments({
      $and: [{ postId: postId }, { status: 'Dislike' }],
    });
    const newestLikes: Array<PostsLikesDocument> = await this.postsLikesModel
      .find({ $and: [{ postId: postId }, { status: 'Like' }] })
      .sort({ addedAt: 'desc' })
      .limit(3)
      .lean();

    return {
      likesCount: likesCount,
      dislikesCount: dislikesCount,
      newestLikes: newestLikes.map(postLikesMapper),
      myStatus: likeStatus,
    };
  }
}

export const postLikesMapper = (like: PostsLikesDocument): NewestLikeType => {
  return {
    addedAt: like.addedAt,
    userId: like.likeOwnerId,
    login: like.likeOwnerName,
  };
};
