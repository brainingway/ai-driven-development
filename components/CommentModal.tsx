'use client';

import { useState, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IImage } from '@/types';

interface IComment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface ICommentModalProps {
  image: IImage;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentModal({ image, isOpen, onClose }: ICommentModalProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 목업 댓글 데이터 생성
  useEffect(() => {
    if (isOpen) {
      const mockComments: IComment[] = [
        {
          id: 'comment_1',
          text: '정말 멋진 작품이네요! AI가 이런 창의적인 이미지를 만들 수 있다니 놀랍습니다.',
          author: {
            id: 'user_6',
            name: 'Sophia',
            avatar: ''
          },
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'comment_2',
          text: '프롬프트가 정말 인상적이에요. 어떤 키워드를 사용하셨나요?',
          author: {
            id: 'user_7',
            name: 'Michael',
            avatar: ''
          },
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'comment_3',
          text: '색감이 정말 아름다워요. 특히 빛의 표현이 인상적입니다.',
          author: {
            id: 'user_8',
            name: 'Emma',
            avatar: ''
          },
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
        }
      ];
      setComments(mockComments);
    }
  }, [isOpen]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    // 목업 API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCommentObj: IComment = {
      id: `comment_${Date.now()}`,
      text: newComment.trim(),
      author: {
        id: 'current_user',
        name: '나',
        avatar: ''
      },
      createdAt: new Date().toISOString()
    };

    setComments(prev => [newCommentObj, ...prev]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return `${Math.floor(diffInHours / 24)}일 전`;
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#F7DC6F',
      '#FFA07A', '#BB8FCE', '#DDA0DD', '#98D8C8', '#F0E68C'
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>댓글</span>
            <span className="text-sm text-gray-500">({comments.length})</span>
          </DialogTitle>
        </DialogHeader>

        {/* 댓글 목록 */}
        <div className="flex-1 overflow-y-auto space-y-4 max-h-96">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                {comment.author.avatar ? (
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                ) : (
                  <div 
                    className="h-full w-full rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: getAvatarColor(comment.author.id) }}
                  >
                    {comment.author.name[0]}
                  </div>
                )}
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 break-words">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 댓글 입력 */}
        <div className="flex gap-2 pt-4 border-t">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="댓글을 입력하세요..."
            className="flex-1"
            disabled={isSubmitting}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            size="sm"
            className="px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
