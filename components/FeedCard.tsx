'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IImage, IFeedCardProps } from '@/types';
import { toggleLike } from '@/utils/mockData';
import CommentModal from './CommentModal';
import { useRouter } from 'next/navigation';

export default function FeedCard({ image, onLikeToggle }: IFeedCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(image.isLiked || false);
  const [likesCount, setLikesCount] = useState(image.likes);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // 이미지 ID별 색상 생성
  const getImageColor = (id: string) => {
    const colors = [
      '#FF6B6B', // 빨간색
      '#45B7D1', // 파란색
      '#F7DC6F', // 노란색
      '#BB8FCE', // 보라색
      '#98D8C8'  // 초록색
    ];
    const index = parseInt(id.replace(/\D/g, '')) - 1;
    return colors[index] || colors[0];
  };

  // 이미지 ID별 텍스트 생성
  const getImageText = (id: string) => {
    const texts = ['AI Art 1', 'AI Art 2', 'AI Art 3', 'AI Art 4', 'AI Art 5'];
    const index = parseInt(id.replace(/\D/g, '')) - 1;
    return texts[index] || 'AI Art';
  };

  // 아바타 ID별 색상 생성
  const getAvatarColor = (id: string) => {
    const colors = [
      '#4ECDC4', // 청록색
      '#96CEB4', // 연한 초록색
      '#FFA07A', // 연한 주황색
      '#DDA0DD', // 연한 보라색
      '#F0E68C'  // 연한 노란색
    ];
    const index = parseInt(id.replace(/\D/g, '')) - 1;
    return colors[index] || colors[0];
  };

  const handleImageClick = () => {
    router.push(`/feed/${image.id}`);
  };

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (isLoading) return;
    
    setIsLoading(true);
    const newLikedState = !isLiked;
    
    // Optimistic update
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    try {
      const result = await toggleLike(image.id, newLikedState);
      if (result.success) {
        setLikesCount(result.likes);
        onLikeToggle?.(image.id, newLikedState);
      } else {
        // Rollback on failure
        setIsLiked(!newLikedState);
        setLikesCount(prev => !newLikedState ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.error('Like toggle failed:', error);
      // Rollback on error
      setIsLiked(!newLikedState);
      setLikesCount(prev => !newLikedState ? prev + 1 : prev - 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setIsCommentModalOpen(true);
  };

  const handleRemix = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    // TODO: 생성 에디터로 이동
    console.log('Navigate to generate editor:', image.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    // TODO: 공유 기능 구현
    console.log('Share image:', image.id);
  };

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
        <CardContent className="p-0">
          {/* 이미지 영역 - 클릭 시 상세화면으로 이동 */}
          <div 
            className="relative aspect-square overflow-hidden"
            onClick={handleImageClick}
          >
            {image.thumbnailUrl ? (
              <img
                src={image.thumbnailUrl}
                alt={image.prompt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onLoad={() => console.log('Image loaded successfully:', image.thumbnailUrl)}
                onError={(e) => console.error('Image failed to load:', image.thumbnailUrl, e)}
              />
            ) : (
              <div 
                className="h-full w-full transition-transform duration-300 group-hover:scale-105 flex items-center justify-center text-white text-2xl font-bold"
                style={{
                  backgroundColor: getImageColor(image.id),
                  minHeight: '400px',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                {getImageText(image.id)}
              </div>
            )}
            
            {/* 프롬프트 프리뷰 (hover 시 표시) */}
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-center text-sm text-white line-clamp-3">
                  {image.prompt}
                </p>
              </div>
            </div>
          </div>

          {/* 카드 하단 정보 */}
          <div className="p-4">
            {/* 작성자 정보 */}
            <div className="mb-3 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {image.author.avatar ? (
                  <AvatarImage src={image.author.avatar} alt={image.author.name} />
                ) : (
                  <div 
                    className="h-full w-full rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: getAvatarColor(image.author.id) }}
                  >
                    {image.author.name[0]}
                  </div>
                )}
                <AvatarFallback>{image.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {image.author.name}
                </p>
                {image.author.isFollowing && (
                  <Badge variant="secondary" className="text-xs">
                    팔로잉
                  </Badge>
                )}
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeToggle}
                  disabled={isLoading}
                  className={`h-8 w-8 p-0 hover:bg-red-50 ${
                    isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <span className="text-xs text-gray-600 min-w-[20px]">
                  {likesCount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  className="h-8 w-8 p-0 text-gray-500 hover:bg-blue-50"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <span className="text-xs text-gray-600 min-w-[20px]">
                  {image.comments.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemix}
                  className="h-8 w-8 p-0 text-gray-500 hover:bg-green-50"
                >
                  <Repeat2 className="h-4 w-4" />
                </Button>
                <span className="text-xs text-gray-600 min-w-[20px]">
                  {image.remixes.toLocaleString()}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 댓글 모달 */}
      <CommentModal
        image={image}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
      />
    </>
  );
}
