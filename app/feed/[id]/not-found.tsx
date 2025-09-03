import { Button } from '@/components/ui/button';
import { ArrowLeft, ImageOff } from 'lucide-react';
import Link from 'next/link';

export default function FeedNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">이미지를 찾을 수 없습니다</h1>
          <p className="text-gray-600 max-w-md">
            요청하신 이미지가 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              메인으로 돌아가기
            </Button>
          </Link>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}
