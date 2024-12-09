import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { SSEData, sseDataAtom } from '../store/sseStore';
import { useQueryClient } from '@tanstack/react-query';

const SSEHandler: React.FC<{ communityPostId: number }> = ({
  communityPostId,
}) => {
  const [, setSseData] = useAtom(sseDataAtom);
  const queryClient = useQueryClient();
  const queryKey = ['postDetail', communityPostId];

  useEffect(() => {
    const eventSource = new EventSource(
      `/api/community/post/${communityPostId}/participants`
    );

    eventSource.onmessage = (event) => {
      const parsedData: SSEData = JSON.parse(event.data);

      // 클라이언트 상태 업데이트
      setSseData((prev) => ({
        ...prev,
        participants: parsedData.participants,
        participationCount: parsedData.participationCount,
        postStatus: parsedData.postStatus,
        paymentCount: parsedData.paymentCount,
        refundedCount: parsedData.refundedCount,
        participationStatus: parsedData.participationStatus,
      }));

      // React Query 데이터 재검증
      queryClient.invalidateQueries({ queryKey });
    };

    eventSource.onerror = () => {
      console.error('SSE 연결 오류');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [communityPostId, queryClient, setSseData]);

  return null;
};

export default SSEHandler;
