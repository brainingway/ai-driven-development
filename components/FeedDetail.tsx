'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Repeat2, Share2, Download, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IImage, IFeedDetailProps } from '@/types';
import { toggleLike } from '@/utils/mockData';
import { useRouter } from 'next/navigation';
import CommentModal from './CommentModal';

export default function FeedDetail({ image }: IFeedDetailProps) {
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

  const handleLikeToggle = async () => {
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

  const handleComment = () => {
    setIsCommentModalOpen(true);
  };

  const handleRemix = () => {
    // TODO: 생성 에디터로 이동
    console.log('Navigate to generate editor:', image.id);
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    console.log('Share image:', image.id);
  };

  const handleDownload = () => {
    // TODO: 이미지 다운로드 기능 구현
    console.log('Download image:', image.id);
  };

  const handleBookmark = () => {
    // TODO: 북마크 기능 구현
    console.log('Bookmark image:', image.id);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          뒤로가기
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 이미지 영역 */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              {image.thumbnailUrl ? (
                <img
                  src={image.thumbnailUrl}
                  alt={image.prompt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div 
                  className="h-full w-full flex items-center justify-center text-white text-4xl font-bold"
                  style={{
                    backgroundColor: getImageColor(image.id),
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.8)'
                  }}
                >
                  {getImageText(image.id)}
                </div>
              )}
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeToggle}
                  disabled={isLoading}
                  className={`flex items-center gap-2 ${
                    isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{likesCount.toLocaleString()}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">{image.comments.toLocaleString()}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemix}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <Repeat2 className="h-5 w-5" />
                  <span className="font-medium">{image.remixes.toLocaleString()}</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Bookmark className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Download className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="space-y-6">
            {/* 작성자 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  {image.author.avatar ? (
                    <AvatarImage src={image.author.avatar} alt={image.author.name} />
                  ) : (
                    <div 
                      className="h-full w-full rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: getAvatarColor(image.author.id) }}
                    >
                      {image.author.name[0]}
                    </div>
                  )}
                  <AvatarFallback className="text-xl">{image.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{image.author.name}</h3>
                  {image.author.isFollowing && (
                    <Badge variant="secondary" className="mt-1">
                      팔로잉
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                팔로우
              </Button>
            </div>

            {/* 프롬프트 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">프롬프트</h3>
              <p className="text-gray-700 leading-relaxed">{image.prompt}</p>
            </div>

            {/* 이미지 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">이미지 정보</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>생성일</span>
                  <span>{new Date(image.createdAt).toLocaleDateString('ko-KR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>좋아요</span>
                  <span>{image.likes.toLocaleString()}개</span>
                </div>
                <div className="flex justify-between">
                  <span>댓글</span>
                  <span>{image.comments.toLocaleString()}개</span>
                </div>
                <div className="flex justify-between">
                  <span>리믹스</span>
                  <span>{image.remixes.toLocaleString()}개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 모달 */}
      <CommentModal
        image={image}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
      />
    </>
  );
}
