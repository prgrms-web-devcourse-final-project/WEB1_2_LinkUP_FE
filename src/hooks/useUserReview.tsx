// hooks/useUserReview.ts
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyReviews } from '../api/reviewApi';

export const useUserReview = (userId: number) => {
  return useQuery({
    queryKey: ['userReview', userId],
    queryFn: () => getMyReviews(userId),
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
