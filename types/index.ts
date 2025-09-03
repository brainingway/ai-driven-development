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

// CommentModal 관련 인터페이스
export interface IComment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export interface ICommentModalProps {
  image: IImage;
  isOpen: boolean;
  onClose: () => void;
}

// FeedCard 관련 인터페이스
export interface IFeedCardProps {
  image: IImage;
  onLikeToggle?: (imageId: string, liked: boolean) => void;
}

// FeedDetail 관련 인터페이스
export interface IFeedDetailProps {
  image: IImage;
}

// FeedDetail 페이지 관련 인터페이스
export interface IFeedDetailPageProps {
  params: {
    id: string;
  };
}
