import { IImage, IFeedResponse, FeedType } from '@/types';

// 목업 이미지 데이터 생성
const generateMockImages = (count: number, type: FeedType): IImage[] => {
  const prompts = [
    "A futuristic cityscape with flying cars and neon lights",
    "A magical forest with glowing mushrooms and fairy lights",
    "A steampunk robot in a Victorian library",
    "A cyberpunk samurai in a rainy Tokyo street",
    "A fantasy castle floating in the clouds",
    "A space station orbiting a colorful nebula",
    "A steampunk airship flying over mountains",
    "A magical garden with crystal flowers",
    "A futuristic laboratory with holographic displays",
    "A fantasy tavern with magical creatures",
    "A cyberpunk marketplace with neon signs",
    "A steampunk submarine exploring the ocean depths",
    "A magical library with floating books",
    "A futuristic greenhouse with alien plants",
    "A fantasy blacksmith forging magical weapons"
  ];

  const names = [
    "Alice", "Bob", "Charlie", "Diana", "Eve",
    "Frank", "Grace", "Henry", "Iris", "Jack",
    "Kate", "Leo", "Mia", "Noah", "Olivia"
  ];

  const avatars = [
    "https://i.pravatar.cc/150?img=1", "https://i.pravatar.cc/150?img=2", "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4", "https://i.pravatar.cc/150?img=5", "https://i.pravatar.cc/150?img=6"
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `img_${type}_${Date.now()}_${index}`,
    thumbnailUrl: `https://picsum.photos/seed/${type}_${index}/400/400`,
    fullUrl: `https://picsum.photos/seed/${type}_${index}/800/800`,
    prompt: prompts[index % prompts.length],
    author: {
      id: `user_${index}`,
      name: names[index % names.length],
      avatar: avatars[index % avatars.length],
      isFollowing: Math.random() > 0.7
    },
    likes: Math.floor(Math.random() * 500) + 10,
    comments: Math.floor(Math.random() * 50) + 1,
    remixes: Math.floor(Math.random() * 20) + 0,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    isLiked: Math.random() > 0.8
  }));
};

// 피드 타입별 데이터 생성
export const getMockFeed = async (
  type: FeedType,
  page: number = 1,
  limit: number = 20
): Promise<IFeedResponse> => {
  console.log('getMockFeed called:', { type, page, limit });
  
  // API 지연 시뮬레이션 (개발용으로 단축)
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

  // 테스트용 하드코딩된 데이터 (5개)
  const testImages: IImage[] = [
    {
      id: 'test_1',
      thumbnailUrl: '',
      fullUrl: '',
      prompt: 'A futuristic cityscape with flying cars and neon lights',
      author: {
        id: 'user_1',
        name: 'Alice',
        avatar: '',
        isFollowing: true
      },
      likes: 150,
      comments: 12,
      remixes: 5,
      createdAt: new Date().toISOString(),
      isLiked: false
    },
    {
      id: 'test_2',
      thumbnailUrl: '',
      fullUrl: '',
      prompt: 'A magical forest with glowing mushrooms and fairy lights',
      author: {
        id: 'user_2',
        name: 'Bob',
        avatar: '',
        isFollowing: false
      },
      likes: 89,
      comments: 8,
      remixes: 3,
      createdAt: new Date().toISOString(),
      isLiked: true
    },
    {
      id: 'test_3',
      thumbnailUrl: '',
      fullUrl: '',
      prompt: 'A steampunk robot in a Victorian library',
      author: {
        id: 'user_3',
        name: 'Charlie',
        avatar: '',
        isFollowing: true
      },
      likes: 234,
      comments: 18,
      remixes: 7,
      createdAt: new Date().toISOString(),
      isLiked: false
    },
    {
      id: 'test_4',
      thumbnailUrl: '',
      fullUrl: '',
      prompt: 'A cyberpunk samurai in a rainy Tokyo street',
      author: {
        id: 'user_4',
        name: 'Diana',
        avatar: '',
        isFollowing: false
      },
      likes: 67,
      comments: 6,
      remixes: 2,
      createdAt: new Date().toISOString(),
      isLiked: false
    },
    {
      id: 'test_5',
      thumbnailUrl: '',
      fullUrl: '',
      prompt: 'A fantasy castle floating in the clouds',
      author: {
        id: 'user_5',
        name: 'Eve',
        avatar: '',
        isFollowing: true
      },
      likes: 312,
      comments: 25,
      remixes: 12,
      createdAt: new Date().toISOString(),
      isLiked: true
    }
  ];

  console.log('Returning test images:', testImages.length);
  
  return {
    data: testImages,
    nextPage: null,
    hasMore: false
  };
};

// 좋아요 토글 시뮬레이션
export const toggleLike = async (imageId: string, liked: boolean): Promise<{ success: boolean; likes: number }> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    success: true,
    likes: Math.floor(Math.random() * 500) + 10
  };
};
