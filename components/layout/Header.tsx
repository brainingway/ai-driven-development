'use client';

import { useState } from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 검색 기능 구현
    console.log('Search query:', searchQuery);
  };

  const handleCreateImage = () => {
    // TODO: 이미지 생성 페이지로 이동
    console.log('Navigate to create image');
  };

  const handleNotifications = () => {
    // TODO: 알림 페이지로 이동
    console.log('Navigate to notifications');
    setNotificationCount(0);
  };

  const handleProfile = () => {
    // TODO: 프로필 페이지로 이동
    console.log('Navigate to profile');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <h1 className="text-xl font-bold text-gray-900">AI Art Gallery</h1>
          </div>

          {/* 검색바 */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="이미지나 프롬프트를 검색해보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </form>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center gap-3">
            {/* 이미지 생성 버튼 */}
            <Button
              onClick={handleCreateImage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              생성하기
            </Button>

            {/* 알림 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotifications}
              className="relative h-10 w-10 rounded-full hover:bg-gray-100"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* 프로필 아바타 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfile}
              className="h-10 w-10 rounded-full hover:bg-gray-100 p-0"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatars/default-avatar.png" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
