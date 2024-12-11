import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import axiosInstance from '../api/axiosInstance';
import { Post, SSEEvent, PostDetailResponse } from './../types/postTypes';
import { fetchPostById } from '../components/pages/community/api/postApi';

// 포스트 목록 상태 관리
export const postsAtom = atomWithQuery(() => ({
  queryKey: ['posts'],
  queryFn: async (): Promise<Post[]> => {
    const response = await axiosInstance.get<Post[]>('/api/community/post');
    if (response.status !== 200) throw new Error('Failed to fetch posts');
    return response.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: () => {
    alert('포스트를 불러오는 데 실패했습니다.');
  },
}));

// 선택된 포스트 ID 상태 관리
export const selectedPostIdAtom = atom<number | null>(null);

// 참여 수량 저장을 위한 상태 추가
export const joinQuantityAtom = atom<number | null>(null);

// 선택된 포스트 상태 관리
export const selectedPostAtom = atomWithQuery<PostDetailResponse | null>(
  (get) => ({
    queryKey: ['selectedPost', get(selectedPostIdAtom)],
    queryFn: async (): Promise<PostDetailResponse | null> => {
      const communityPostId = get(selectedPostIdAtom);
      if (!communityPostId) return null;
      return await fetchPostById(communityPostId);
    },
    enabled: Boolean(get(selectedPostIdAtom)), // 유효성 검사
    onError: () => {
      alert('선택된 포스트를 불러오는 데 실패했습니다.');
    },
  })
);

// SSE 실시간 데이터 상태 관리
export const realTimeDataAtom = atom<SSEEvent | null>(null);

// SSE 구독 및 상태 업데이트
export const subscribeToSSE = (
  communityPostId: number,
  setRealTimeData: (data: SSEEvent) => void
): EventSource => {
  const eventSource = new EventSource(
    `/api/community/post/${communityPostId}/participants`
  );

  eventSource.onmessage = (event) => {
    const data: SSEEvent = JSON.parse(event.data);
    setRealTimeData(data); // 상태를 업데이트
  };

  eventSource.onerror = () => {
    eventSource.close();
  };

  return eventSource;
};

// SSE 구독 통합: 상태 업데이트 및 이벤트 소스 관리
export const sseSubscriptionAtom = atom((get) => {
  const communityPostId = get(selectedPostIdAtom);
  if (!communityPostId) return null;

  return (set: (atom: typeof realTimeDataAtom, data: SSEEvent) => void) => {
    // SSE 구독 실행
    const eventSource = subscribeToSSE(communityPostId, (data) => {
      set(realTimeDataAtom, data); // 실시간 데이터 상태 업데이트
    });

    // 컴포넌트가 해제되면 이벤트 소스 닫기
    return () => {
      eventSource.close();
    };
  };
});
