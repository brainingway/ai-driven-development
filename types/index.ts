export interface IUser {
  id: string;
  name: string;
  avatar: string;
  isFollowing?: boolean;
}

export interface IImage {
  id: string;
  thumbnailUrl: string;
  fullUrl: string;
  prompt: string;
  author: IUser;
  likes: number;
  comments: number;
  remixes: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface IFeedResponse {
  data: IImage[];
  nextPage: number | null;
  hasMore: boolean;
}

export type FeedType = 'recommended' | 'following' | 'trending';
