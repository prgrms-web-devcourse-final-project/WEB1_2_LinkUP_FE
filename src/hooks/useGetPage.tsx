import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchPendingPosts } from '../components/pages/admin/api/adminApi';

// 승인 대기 게시물을 가져오는 훅
const usePendingPostsQuery = () => {
  return useQuery({
    queryKey: ['pending-posts'],
    queryFn: () => fetchPendingPosts(),
  });
};

// const baseURL = import.meta.env.VITE_API_URL;
// SSE(Server-Sent Events) 구독을 관리하는 훅
// export const usePostSSE = (postId: number) => {
//   const queryClient = useQueryClient();

//   React.useEffect(() => {
//     if (!postId) return;

//     const eventSource = new EventSource(
//       `${baseURL}/api/community/post/${postId}/participants`
//     );

//     eventSource.onmessage = (event) => {
//       const parsedData = JSON.parse(event.data);
//       queryClient.setQueryData(
//         ['postDetail', postId],
//         (oldData: PostDetailResponse | undefined) => {
//           if (!oldData) return oldData;
//           return {
//             ...oldData,
//             realTimeData: parsedData,
//           };
//         }
//       );
//     };

//     return () => eventSource.close();
//   }, [postId, queryClient]);
// };

// 남은 시간을 계산하는 훅
export const useRemainingTime = (
  targetDate: string | undefined,
  type: 'close' | 'payment'
) => {
  const [remainingTime, setRemainingTime] = React.useState<string>('');

  React.useEffect(() => {
    if (!targetDate) return;

    const calculateTime = () => {
      const targetTime = new Date(targetDate).getTime();
      const additionalHours = type === 'close' ? 9 * 24 : 12;
      const countdownTarget = targetTime + additionalHours * 60 * 60 * 1000;
      const now = Date.now();
      const diff = countdownTarget - now;

      if (diff <= 0) {
        return type === 'close' ? '마감되었습니다.' : '결제 마감되었습니다.';
      }

      if (type === 'close') {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${days}일 ${hours}시간 ${minutes}분 남음`;
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
      }
    };

    setRemainingTime(calculateTime());
    const interval = setInterval(
      () => {
        setRemainingTime(calculateTime());
      },
      type === 'close' ? 60000 : 1000
    );

    return () => clearInterval(interval);
  }, [targetDate, type]);

  return remainingTime;
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

export { usePendingPostsQuery };
