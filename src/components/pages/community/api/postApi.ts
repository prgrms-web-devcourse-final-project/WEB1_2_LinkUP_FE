import axiosInstance from '../../../../api/axiosInstance';
import {
  Post,
  CreatePostData,
  PostDetailResponse,
  POST_STATUS,
  SSEEvent,
} from '../../../../types/postTypes';

// 포스트 목록 가져오기 (카테고리와 검색어 기반)
export const fetchPosts = async (
  category?: string,
  searchQuery?: string
): Promise<Post[]> => {
  const response = await axiosInstance.get('/api/community/post');
  if (response.status !== 200) throw new Error('Failed to fetch posts');
  return response.data.filter((post: Post) => {
    const categoryMatch = !category || post.category === category;
    const searchMatch =
      !searchQuery ||
      post.title.includes(searchQuery) ||
      post.description.includes(searchQuery);
    return categoryMatch && searchMatch;
  });
};

// 포스트 상세 조회
export const fetchPostById = async (
  communityPostId: number
): Promise<PostDetailResponse> => {
  const response = await axiosInstance.get(
    `/api/community/post/${communityPostId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }
  );
  if (response.status !== 200) throw new Error('Failed to fetch post details');
  return response.data;
};

// 포스트 생성
export const createPost = async (
  postData: CreatePostData
): Promise<{ message: string }> => {
  const formData = new FormData();
  const jsonContent = JSON.stringify({
    title: postData.title,
    category: postData.category,
    availableNumber: postData.availableNumber,
    period: postData.period,
    totalAmount: postData.totalAmount,
    unitAmount: postData.unitAmount,
    productUrl: postData.productUrl,
    description: postData.description,
  });
  const blobContent = new Blob([jsonContent], { type: 'application/json' });
  formData.append('content', blobContent);

  // 이미지 파일 추가
  postData.imageUrls.forEach((file) => {
    if (file instanceof File) {
      formData.append('images', file); // Content-Type은 자동 설정됨
    } else {
      console.warn('Invalid image file detected:', file);
    }
  });

  const response = await axiosInstance.post('/api/community/post', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  if (response.status !== 200) throw new Error('Failed to create post');
  return response.data;
};

// 포스트 상태 업데이트
export const updatePostStatus = async (
  communityPostId: number,
  newStatus: POST_STATUS
): Promise<Post> => {
  const response = await axiosInstance.get(
    `/api/community/post/${communityPostId}`
  );
  const communityPost: Post = response.data;

  // 상태별 처리 로직
  switch (newStatus) {
    case 'APPROVED': {
      if (
        communityPost.status === 'NOT_APPROVED' ||
        communityPost.status === 'REJECTED'
      ) {
        // '(수정요망)' 제거 로직
        const cleanedTitle = communityPost.title.startsWith('(수정요망)')
          ? communityPost.title.replace(/^\(수정요망\)/, '').trim()
          : communityPost.title;

        // 'APPROVED' 상태로 업데이트 요청
        const updatedResponse = await axiosInstance.patch(
          `/api/admin/post/approve/${communityPostId}`,
          {
            title: cleanedTitle, // 'APPROVED' 시 '(수정요망)' 제거된 제목
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`, // 관리자 인증 필요
            },
          }
        );

        if (updatedResponse.status !== 200) {
          throw new Error('Failed to approve the post');
        }

        return updatedResponse.data;
      } else {
        throw new Error('현재 상태에서 APPROVED로 변경할 수 없습니다.');
      }
    }

    case 'REJECTED': {
      // 실제 API 사용
      if (
        communityPost.status === 'NOT_APPROVED' ||
        communityPost.status === 'REJECTED'
      ) {
        // '(수정요망)' 추가 로직
        const updatedTitle = communityPost.title.startsWith('(수정요망)')
          ? communityPost.title
          : `(수정요망)${communityPost.title}`;

        // 'REJECTED' 상태로 업데이트 요청
        const updatedResponse = await axiosInstance.patch(
          `/api/admin/post/reject/${communityPostId}`,
          {
            title: updatedTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`, // 관리자 인증 필요
            },
          }
        );

        if (updatedResponse.status !== 200) {
          throw new Error('Failed to reject the post');
        }

        return updatedResponse.data;
      } else {
        throw new Error('현재 상태에서 REJECTED로 변경할 수 없습니다.');
      }
    }

    default: {
      throw new Error('잘못된 상태 변경 요청입니다.');
    }
  }
};

// 포스트 수정
export const updatePost = async (
  communityPostId: number,
  updatedPost: Partial<Post>
): Promise<Partial<Post>> => {
  const response = await axiosInstance.patch(
    `/api/mypage/post/${communityPostId}`,
    updatedPost
  );
  return response.data;
};

// 포스트 삭제
export const deletePostById = async (
  communityPostId: number
): Promise<void> => {
  await axiosInstance.delete(`/api/community/post/${communityPostId}`);
};

// 공구 진행 포스트 참여
export const joinPost = async (
  communityPostId: number,
  quantity: number
): Promise<{ message: string }> => {
  const response = await axiosInstance.post(
    `/api/community/post/${communityPostId}/join`,
    {
      number: quantity,
    }
  );
  if (response.status !== 200) throw new Error('Failed to join post');
  return response.data;
};

// 공구 진행 포스트 참여 취소
export const cancelJoinPost = async (
  communityPostId: number
): Promise<{ message: string }> => {
  const response = await axiosInstance.put(
    `/api/community/post/${communityPostId}/cancel`
  );
  if (response.status !== 200)
    throw new Error('Failed to cancel participation');
  return response.data;
};

// SSE: 실시간 정보 구독 (참여 현황, 포스트 상태, 결제 현황) 데이터 수신 및 상태 갱신
export const handleSSEUpdate = (
  postId: number,
  updateState?: (state: {
    postStatus?: POST_STATUS;
    participationCount?: number;
    paymentCount?: number;
  }) => void
): void => {
  const url = `/api/community/post/${postId}/participants`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  // SSE 연결
  const eventSource = new EventSource(url);

  // SSE 메시지 수신
  eventSource.onmessage = (event) => {
    try {
      const data: SSEEvent = JSON.parse(event.data);

      // 상태 갱신 함수가 있을 경우 호출
      if (updateState) {
        updateState({
          postStatus: data.postStatus,
          participationCount: data.participationCount,
          paymentCount: data.paymentCount,
        });
      }
    } catch (error) {
      console.error('Failed to parse SSE data:', error);
    }
  };

  // SSE 연결 오류 처리
  eventSource.onerror = (error) => {
    console.error('SSE connection error:', error);
    eventSource.close();
  };
};

// 댓글 작성
export const addComment = async (
  communityPostId: number,
  userId: number,
  userNickname: string,
  content: string
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.post(`/api/community/post/${communityPostId}/comments`, {
    userId,
    userNickname,
    content,
  });
};

// 댓글 삭제
export const deleteComment = async (
  communityPostId: number,
  commentId: number
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.delete(
    `/api/community/post/${communityPostId}/comments/${commentId}`
  );
};

// 댓글 수정
export const updateComment = async (
  communityPostId: number,
  commentId: number,
  content: string
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.put(
    `/api/community/post/${communityPostId}/comments/${commentId}`,
    {
      content,
    }
  );
};
