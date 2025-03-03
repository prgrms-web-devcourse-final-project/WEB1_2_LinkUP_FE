import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMyChatRooms } from '../api/chatApi';

// 모든 채팅방을 가져오는 훅
export const useChatQuery = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: fetchMyChatRooms,
  });
};

//로딩과 에러 처리
export const QueryHandler = ({
  isLoading,
  isError,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>잠시 후 다시 시도해주세요.</div>;
  return <>{children}</>;
};
