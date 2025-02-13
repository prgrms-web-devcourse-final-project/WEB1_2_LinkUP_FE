import axiosInstance from '../../../../api/axiosInstance';
import {
  Post,
  CreatePostData,
  POST_STATUS,
  SSEEvent,
} from '../../../../types/postTypes';
export interface CommentForm {
  parentId: number | null;
  content: string;
}

// 포스트 목록 가져오기 (카테고리와 검색어 기반)
export const fetchPosts = async (category?: string): Promise<Post[]> => {
  const response = await axiosInstance.get('/api/community/post');
  if (response.status !== 200) throw new Error('Failed to fetch posts');
  console.log(response.data);
  const categoryMatch = response.data.filter(
    (post: Post) => !category || post.communityPost.category === category
  );

  console.log(categoryMatch);
  return categoryMatch;
};

// 포스트 상세 조회
export const fetchPostById = async (communityPostId: number): Promise<Post> => {
  const response = await axiosInstance.get(
    `/api/community/post/${communityPostId}`
  );
  if (response.status !== 200) throw new Error('Failed to fetch post details');
  return response.data;
};

// 포스트 생성
export const createPost = async (
  postData: CreatePostData
): Promise<{ message: string }> => {
  const formData = new FormData();
  const content = {
    title: postData.title,
    category: postData.category,
    availableNumber: postData.availableNumber,
    period: postData.period,
    totalAmount: postData.totalAmount,
    unitAmount: postData.unitAmount,
    productUrl: postData.productUrl,
    description: postData.description,
  };
  formData.append(
    'content',
    new Blob([JSON.stringify(content)], { type: 'application/json' })
  );

  if (postData) {
    postData.imageUrls.forEach((file) => {
      if (file instanceof File) {
        formData.append('images', file); // Content-Type은 자동 설정됨
      }
    });
  }

  const response = await axiosInstance.post('/api/community/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
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
        communityPost.communityPost.status === 'NOT_APPROVED' ||
        communityPost.communityPost.status === 'REJECTED'
      ) {
        // '(수정요망)' 제거 로직
        const cleanedTitle = communityPost.communityPost.title.startsWith(
          '(수정요망)'
        )
          ? communityPost.communityPost.title
              .replace(/^\(수정요망\)/, '')
              .trim()
          : communityPost.communityPost.title;

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
        communityPost.communityPost.status === 'NOT_APPROVED' ||
        communityPost.communityPost.status === 'REJECTED'
      ) {
        // '(수정요망)' 추가 로직
        const updatedTitle = communityPost.communityPost.title.startsWith(
          '(수정요망)'
        )
          ? communityPost.communityPost.title
          : `(수정요망)${communityPost.communityPost.title}`;

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
export const joinPost = async (communityPostId: number, quantity: number) => {
  try {
    const URL = `/api/community/post/${communityPostId}/join`;
    const response = await axiosInstance.post(URL, { number: quantity });
    console.log(response.data);
    return response.data;
  } catch {
    throw new Error('공구 참여에 실패했습니다.');
  }
};

// 공구 진행 포스트 참여 취소
export const cancelJoinPost = async (communityPostId: number) => {
  try {
    const URL = `/api/community/post/${communityPostId}/cancel`;
    const response = await axiosInstance.put(URL);
    return response.data;
  } catch {
    throw new Error('공구 참여 취소에 실패했습니다.');
  }
};

// 댓글 작성
export const addComment = async (
  communityPostId: number,
  payload: CommentForm
): Promise<void> => {
  const URL = `/api/community/comment/${communityPostId}`;
  const response = await axiosInstance.post(URL, payload);
  return response.data;
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

  // SSE 연결
  const eventSource = new EventSource(url);

  // SSE 메시지 수신
  eventSource.onmessage = (event) => {
    const data: SSEEvent = JSON.parse(event.data);

    // 상태 갱신 함수가 있을 경우 호출
    if (updateState) {
      updateState({
        postStatus: data.postStatus,
        participationCount: data.participationCount,
        paymentCount: data.paymentCount,
      });
    }
  };

  // SSE 연결 오류 처리
  eventSource.onerror = () => {
    eventSource.close();
  };
};
