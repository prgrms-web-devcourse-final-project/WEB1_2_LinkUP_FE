import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  selectedPostAtom,
  realTimeDataAtom,
  selectedPostIdAtom,
  joinQuantityAtom,
} from '../../../store/postStore';
import { currentUserAtom } from '../../../store/userStore';
import styled from 'styled-components';
import {
  fetchPostById,
  joinPost,
  cancelJoinPost,
  deletePostById,
} from '../community/api/postApi';
import { FaBackspace } from 'react-icons/fa';
import { POST_STATUS, PostDetailResponse } from '../../../types/postTypes';
import PostImageSection from './PostDetailPage/PostImageSection';
import PostDetailsSection from './PostDetailPage/PostDetailsSection';
import PostCommentsSection from './PostDetailPage/PostCommentsSection';

const PostDetailPage: React.FC = () => {
  const { communityPostId } = useParams<{ communityPostId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedPost] = useAtom(selectedPostAtom);
  const [realTimeData, setRealTimeData] = useAtom(realTimeDataAtom);
  const [, setSelectedPostId] = useAtom(selectedPostIdAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const [joinQuantity] = useAtom(joinQuantityAtom);

  const [quantity, setQuantity] = useState<number>(1);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [paymentRemainingTime, setPaymentRemainingTime] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const communityPostIdNumber = Number(communityPostId);
  const queryKey = ['postDetail', communityPostIdNumber];

  // 게시물 ID 설정 및 초기화
  useEffect(() => {
    if (communityPostIdNumber) {
      setSelectedPostId(communityPostIdNumber);
    } else {
      alert('잘못된 게시물 ID입니다.');
      navigate('/community/post');
    }
  }, [communityPostIdNumber, setSelectedPostId, navigate]);

  // 게시물 데이터 가져오기
  const { data, isError } = useQuery<PostDetailResponse>({
    queryKey,
    queryFn: async (): Promise<PostDetailResponse> =>
      fetchPostById(communityPostIdNumber),
  });

  useEffect(() => {
    if (data) {
      const quantityToSet =
        data.participationStatus === 'JOIN' ||
        data.participationStatus === 'PAYMENT_STANDBY'
          ? (joinQuantity ?? 1)
          : 1;
      setQuantity(quantityToSet);
    }
  }, [data, joinQuantity]);

  const isParticipant = selectedPost.data?.participationStatus === 'JOIN';
  const isNotParticipant = !selectedPost.data?.participationStatus;
  const isAuthor = selectedPost.data?.communityPost.userId === currentUser?.id;

  // SSE 연결 활성화
  useEffect(() => {
    if (communityPostIdNumber) {
      const eventSource = new EventSource(
        `/api/community/post/${communityPostIdNumber}/participants`
      );

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setRealTimeData(parsedData);
        queryClient.invalidateQueries({ queryKey });
      };

      eventSource.onerror = () => {
        console.error('SSE 연결 오류 발생');
        eventSource.close();
      };

      return () => eventSource.close();
    }
  }, [communityPostIdNumber, queryClient, setRealTimeData]);

  // 오류 처리
  useEffect(() => {
    if (isError) {
      alert('게시물을 불러오는 데 실패했습니다.');
      navigate('/community/post');
    }
  }, [isError, navigate]);

  // 마감 시간 계산
  useEffect(() => {
    if (selectedPost.data?.communityPost.closeAt) {
      const calculateRemainingTime = () => {
        const now = Date.now();
        const targetTime = new Date(
          selectedPost.data?.communityPost.closeAt || ''
        ).getTime();
        const diff = targetTime - now;
        if (diff <= 0) return '마감되었습니다.';
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${days}일 ${hours}시간 ${minutes}분 남음`;
      };

      setRemainingTime(calculateRemainingTime());
      const timer = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [selectedPost]);

  // 결제 마감 시간 계산
  useEffect(() => {
    if (
      selectedPost.data?.communityPost.status === POST_STATUS.PAYMENT_STANDBY &&
      selectedPost.data.communityPost.paymentDeadline
    ) {
      const countdownTarget =
        new Date(selectedPost.data.communityPost.paymentDeadline).getTime() +
        12 * 60 * 60 * 1000;

      const calculatePaymentTime = () => {
        const now = new Date().getTime();
        const diff = countdownTarget - now;

        if (diff <= 0) return '결제 마감되었습니다.';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
      };

      setPaymentRemainingTime(calculatePaymentTime());
      const timer = setInterval(() => {
        setPaymentRemainingTime(calculatePaymentTime());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedPost]);

  // 게시물 삭제 핸들러
  const deletePostMutation = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      alert('게시물이 삭제되었습니다.');
      navigate('/community/post');
    },
    onError: () => {
      alert('게시물 삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      deletePostMutation.mutate(communityPostIdNumber);
    }
  };

  interface JoinPostResponse {
    message: string;
  }

  // 참여 핸들러
  const { mutate: joinMutation } = useMutation<
    JoinPostResponse,
    Error, // 에러 타입
    { communityPostId: number; quantity: number }
  >({
    mutationFn: ({ communityPostId, quantity }) =>
      joinPost(communityPostId, quantity),
    onSuccess: () => {
      alert('공구 참여가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey }); // 정확한 queryKey 사용
    },
    onError: (error: Error) => {
      console.error('공구 참여 실패:', error.message); // 오류 메시지 출력
      alert('공구 참여에 실패했습니다.');
    },
  });

  // 참여 버튼 핸들러
  const handleJoin = () => {
    if (!quantity) {
      alert('수량을 입력해주세요.');
      return;
    }

    joinMutation({ communityPostId: communityPostIdNumber, quantity });
  };

  // 초기 수량 설정 (참여 상태 확인)
  useEffect(() => {
    if (
      selectedPost.data?.participationStatus === 'JOIN' &&
      joinQuantity !== null
    ) {
      setQuantity(joinQuantity);
    }
  }, [selectedPost.data?.participationStatus, joinQuantity]);

  // 참여 취소 핸들러
  const cancelMutation = useMutation({
    mutationFn: () => cancelJoinPost(communityPostIdNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      alert('참여가 취소되었습니다.');
    },
    onError: () => {
      alert('참여 취소에 실패했습니다.');
    },
  });

  const handleCancel = () => {
    cancelMutation.mutate();
  };

  const handleReport = () => {
    navigate(`/community/post/${communityPostId}/report`);
  };

  // 수량 변경
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (
      newQuantity > 0 &&
      newQuantity <= selectedPost.data!.communityPost.availableNumber
    ) {
      setQuantity(newQuantity);
    }
  };

  // 결제하기 페이지로 이동
  const handlePayment = () => {
    if (
      selectedPost.data?.participationStatus !== POST_STATUS.PAYMENT_STANDBY
    ) {
      alert('현재 결제할 수 없는 상태입니다.');
      return;
    }

    const paymentState = {
      post: {
        title: selectedPost.data.communityPost.title,
        unitAmount: selectedPost.data.communityPost.unitAmount,
        imageUrls: selectedPost.data.communityPost.imageUrls,
      },
      quantity,
    };

    if (isAuthor) {
      // 작성자인 경우 PaymentAuthorPage로 이동
      navigate(`/community/post/${communityPostId}/payment/author`, {
        state: paymentState,
      });
    } else {
      // 참여자인 경우 PaymentParticipantPage로 이동
      navigate(`/community/post/${communityPostId}/payment/participant`, {
        state: paymentState,
      });
    }
  };

  // 환불 요청 페이지로 이동
  const handleRefund = () => {
    if (selectedPost.data?.participationStatus === 'PAYMENT_COMPLETE') {
      navigate(`/community/post/${communityPostId}/refund`);
    } else {
      alert('환불 요청이 불가능한 상태입니다.');
    }
  };

  if (!selectedPost.data?.communityPost) return <div>게시물이 없습니다.</div>;

  return (
    <PostDetailContainer>
      <ContentWrapper>
        <Header>
          <Title>공구 모집 및 진행</Title>
          <HeaderWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <FaBackspace size={24} />
            </BackButton>
            <HeaderButtonsWrapper>
              {!isAuthor ? (
                <HeaderButton onClick={handleReport}>글 신고</HeaderButton>
              ) : isNotParticipant ? (
                <HeaderButton onClick={handleDelete}>글 삭제</HeaderButton>
              ) : (
                ''
              )}
            </HeaderButtonsWrapper>
          </HeaderWrapper>
        </Header>

        <FormContainer>
          <ImageAndDetailsContainer>
            {/* 이미지 섹션 */}
            <PostImageSection
              selectedPost={{
                imageUrls: selectedPost.data.communityPost.imageUrls,
                productUrl: selectedPost.data.communityPost.productUrl,
              }}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />

            <PostDetailsSection
              selectedPost={selectedPost.data.communityPost}
              realTimeData={realTimeData}
              quantity={quantity}
              isParticipant={isParticipant}
              isNotParticipant={isNotParticipant}
              remainingTime={remainingTime}
              paymentRemainingTime={paymentRemainingTime}
              handleQuantityChange={handleQuantityChange}
              handleJoin={handleJoin}
              handleCancel={handleCancel}
              handleRefund={handleRefund}
              handlePayment={handlePayment}
            />
          </ImageAndDetailsContainer>

          {/* 내용 섹션 */}
          <TextAreaWrapper>
            <TextArea
              readOnly
              value={selectedPost.data.communityPost.description}
            />
          </TextAreaWrapper>

          {/* 댓글 컨테이너 */}
          <PostCommentsSection
            communityPostId={communityPostIdNumber}
            comments={selectedPost.data.communityPost.comments.map(
              (comment) => ({
                ...comment,
                commentId: Number(comment.commentId),
              })
            )}
          />
        </FormContainer>
      </ContentWrapper>
    </PostDetailContainer>
  );
};

export default PostDetailPage;

const PostDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column; /* Title과 HeaderWrapper를 세로로 배치 */
  gap: 10px; /* Title과 HeaderWrapper 사이 간격 */
  margin-bottom: 1.5rem;
`;

const HeaderWrapper = styled.div`
  width: 1000px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderButton = styled.button`
  padding: 10px 15px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
  margin: 0; /* Title의 기본 마진 제거 */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageAndDetailsContainer = styled.div`
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 기본값이므로 명시적으로 추가 */
  align-items: stretch; /* 양쪽 요소의 높이를 동일하게 */
  justify-content: center; /* 양쪽 여백 균등 배치 */
  gap: 20px; /* 두 컨테이너 사이 간격 */
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 460px; /* 고정된 높이 */
  border: none; /* 테두리 제거 */
  border-radius: 10px;
  padding: 20px;
  outline: none; /* 포커스 시 외곽선 제거 */
  resize: none; /* 크기 조절 비활성화 */
  font-size: 1rem; /* 텍스트 크기 */
  line-height: 1.5;
  color: #333; /* 텍스트 색상 */
  box-sizing: border-box;
`;
