import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostById } from '../components/pages/Payment/api/getPostApi';

// 게시글 ID로 게시글 정보를 가져오는 훅
export const usePostQuery = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
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
