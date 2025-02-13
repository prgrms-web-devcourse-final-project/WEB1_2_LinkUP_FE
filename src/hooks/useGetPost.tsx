import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchPostById,
  fetchPosts,
} from '../components/pages/community/api/postApi';

// 전체 게시물을 가져오는 훅
export const usePostsQuery = (category?: string) => {
  return useQuery({
    queryKey: ['posts', category],
    queryFn: () => fetchPosts(category),
  });
};

// 개별 게시물을 가져오는 훅
export const usePostQuery = (postId: number, checkParticipant?: boolean) => {
  return useQuery({
    queryKey: ['post', postId, checkParticipant ?? false],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId,
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
