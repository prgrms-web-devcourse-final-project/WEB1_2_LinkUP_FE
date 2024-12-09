export interface Post {
  communityPostId: number;
  title: string;
  totalAmount: number;
  description: string;
  productUrl: string;
  category: string;
  availableNumber: number;
  createdAt: string;
  period: number;
  closeAt: string;
  unitAmount: number;
  imageUrls: File[];
  status: POST_STATUS;
  userId: number;
  nickname: string;
  paymentDeadline?: string;
  stateUpdatedAt?: string;
  comments: Comment[];
}

// 포스트 상태 타입
export enum POST_STATUS {
  NOT_APPROVED = 'NOT_APPROVED',
  APPROVED = 'APPROVED',
  PAYMENT_STANDBY = 'PAYMENT_STANDBY',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}

// 참여자 기본 타입
export interface Participant {
  userId: number;
  nickname: string;
  isCancelled: boolean;
  isPaymentCompleted: boolean;
  quantity: number;
}

// 포스트 작성 데이터 타입
export interface CreatePostData {
  title: string;
  totalAmount: number;
  description: string;
  productUrl: string;
  category: string;
  availableNumber: number;
  period: number;
  unitAmount: number;
  imageUrls: File[];
}

// 포스트 상세 응답 타입
export interface PostDetailResponse {
  communityPost: Post;
  participationStatus:
    | 'JOIN'
    | 'CANCEL'
    | 'PAYMENT_STANDBY'
    | 'PAYMENT_CANCEL'
    | 'PAYMENT_COMPLETE';
  isWriter: boolean;
}

// SSE 이벤트 타입
export interface SSEEvent {
  participationCount: number;
  postStatus: POST_STATUS;
  paymentCount: number;
}

// 댓글 타입
export interface Comment {
  id: number;
  userId: number;
  userNickname: string;
  commentId: string;
  createdAt: string;
  content: string;
}
