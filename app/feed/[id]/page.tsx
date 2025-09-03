import FeedDetail from '@/components/FeedDetail';
import { getMockFeed } from '@/utils/mockData';
import { notFound } from 'next/navigation';
import { IFeedDetailPageProps } from '@/types';

export default async function FeedDetailPage({ params }: IFeedDetailPageProps) {
  try {
    // 모든 피드 데이터에서 해당 ID의 이미지 찾기
    const feedResponse = await getMockFeed('recommended', 1, 100);
    const image = feedResponse.data.find(img => img.id === params.id);
    
    if (!image) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <FeedDetail image={image} />
      </div>
    );
  } catch (error) {
    console.error('Failed to load feed detail:', error);
    notFound();
  }
}
