'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import FeedCard from '@/components/FeedCard';
import { IImage, FeedType } from '@/types';
import { getMockFeed } from '@/utils/mockData';

export default function Feed() {
  const [activeTab, setActiveTab] = useState<FeedType>('recommended');
  const [images, setImages] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // 피드 데이터 로드
  const loadFeed = useCallback(async (type: FeedType, page: number = 1, append: boolean = false) => {
    console.log('Loading feed:', { type, page, append, isLoading });
    
    if (isLoading && !append) return;
    
    setIsLoading(true);
    try {
      const response = await getMockFeed(type, page, 20);
      console.log('Feed response:', response);
      
      if (append) {
        setImages(prev => [...prev, ...response.data]);
      } else {
        setImages(response.data);
      }
      
      setHasMore(response.hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // 탭 변경 시 피드 로드
  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
    setHasMore(true);
    loadFeed(activeTab, 1, false);
  }, [activeTab]);

  // 초기 데이터 로드
  useEffect(() => {
    console.log('Initial load effect triggered');
    loadFeed(activeTab, 1, false);
  }, []);

  // 무한 스크롤 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadFeed(activeTab, currentPage + 1, true);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, currentPage, activeTab]);

  // 좋아요 토글 핸들러
  const handleLikeToggle = useCallback((imageId: string, liked: boolean) => {
    setImages(prev => 
      prev.map(img => 
        img.id === imageId 
          ? { ...img, isLiked: liked, likes: liked ? img.likes + 1 : img.likes - 1 }
          : img
      )
    );
  }, []);

  // 로딩 스켈레톤
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FeedType)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="recommended">추천</TabsTrigger>
          <TabsTrigger value="following">팔로잉</TabsTrigger>
          <TabsTrigger value="trending">트렌딩</TabsTrigger>
        </TabsList>

                 <TabsContent value="recommended" className="space-y-6">
           {images.length === 0 && isLoading ? (
             <LoadingSkeleton />
           ) : (
             <>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {images.map((image) => (
                   <FeedCard
                     key={image.id}
                     image={image}
                     onLikeToggle={handleLikeToggle}
                   />
                 ))}
               </div>
               
               {isLoading && <LoadingSkeleton />}
               
               {hasMore && (
                 <div ref={loadingRef} className="flex justify-center py-8">
                   <Skeleton className="h-8 w-32" />
                 </div>
               )}
             </>
           )}
         </TabsContent>

        <TabsContent value="following" className="space-y-6">
          {images.length === 0 && isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {images.map((image) => (
                  <FeedCard
                    key={image.id}
                    image={image}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
              
              {isLoading && <LoadingSkeleton />}
              
              {hasMore && (
                <div ref={loadingRef} className="flex justify-center py-8">
                  <Skeleton className="h-8 w-32" />
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          {images.length === 0 && isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {images.map((image) => (
                  <FeedCard
                    key={image.id}
                    image={image}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
              
              {isLoading && <LoadingSkeleton />}
              
              {hasMore && (
                <div ref={loadingRef} className="flex justify-center py-8">
                  <Skeleton className="h-8 w-32" />
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
