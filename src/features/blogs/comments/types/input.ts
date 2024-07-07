export type CreateCommentDto = {
  content: string;
};

export type CommentCreateDto = {
  content: string;
  postId: string;
  userId: string;
};

export type CommentUpdateDto = {
  content: string;
};

export type SortCommentsType = {
  sortBy: string;
  sortDirection: -1 | 1;
  pageNumber: number;
  pageSize: number;
};
