import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
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
  handleSSEUpdate,
} from '../community/api/postApi';
import { FaBackspace } from 'react-icons/fa';
import {
  Post,
  POST_STATUS,
  PostDetailResponse,
  SSEEvent,
} from '../../../types/postTypes';
import PostImageSection from './PostDetailPage/PostImageSection';
import PostDetailsSection from './PostDetailPage/PostDetailsSection';
import PostCommentsSection from './PostDetailPage/PostCommentsSection';
import SSEHandler from '../../../utils/SSEHandler';
import ParticipantList from './ParticipantList';
import { useAuth } from '../../../context/AuthContext';

const PostDetailPage: React.FC = () => {
  const { communityPostId } = useParams<{ communityPostId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [data, setData] = useState<PostDetailResponse | null>(null);
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
      navigate('/community/post');
    }
  }, [communityPostIdNumber, setSelectedPostId, navigate]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await fetchPostById(Number(communityPostId!));
        setData(data);
        setPost(data.communityPost);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        navigate('*');
      }
    };

    if (communityPostId) fetchPostDetails();
  }, [communityPostId, navigate]);

  useEffect(() => {
    if (data!) {
      const quantityToSet =
        data!.participationStatus === 'JOIN' ||
        data!.participationStatus === 'PAYMENT_STANDBY'
          ? (joinQuantity ?? 1)
          : 1;
      setQuantity(quantityToSet);
    }
  }, [data!, joinQuantity]);

  const isParticipant =
    realTimeData?.participationStatus === 'JOIN' ||
    realTimeData?.participationStatus === 'PAYMENT_STANDBY';
  const isNotParticipant = !realTimeData?.participationStatus;
  const isAuthor = post?.userId === currentUser?.id;

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
        eventSource.close();
      };

      return () => eventSource.close();
    }
  }, [communityPostIdNumber, queryClient, setRealTimeData]);

  // 마감 시간 계산
  useEffect(() => {
    if (post?.closeAt) {
      const calculateRemainingTime = () => {
        const createdTime = new Date(post.closeAt || '').getTime();
        const targetTime = createdTime + 9 * 24 * 60 * 60 * 1000;
        const now = Date.now();
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
  }, [post?.createdAt, post?.period]);

  // 결제 마감 시간 계산
  useEffect(() => {
    if (post?.status === POST_STATUS.PAYMENT_STANDBY && post?.paymentDeadline) {
      const calculatePaymentTime = () => {
        const paymentDeadlineTime = new Date(
          post.paymentDeadline || ''
        ).getTime();
        const countdownTarget = paymentDeadlineTime + 12 * 60 * 60 * 1000;
        const now = Date.now();
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
  }, [post?.status, post?.paymentDeadline]);

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
      handleSSEUpdate(communityPostIdNumber);
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
    mutationFn: ({
      communityPostId,
      quantity,
    }: {
      communityPostId: number;
      quantity: number;
    }) => joinPost(communityPostId, quantity),
    onSuccess: () => {
      alert('공구 참여가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey }); // 정확한 queryKey 사용
    },
    onError: () => {
      alert('공구 참여에 실패했습니다.');
    },
  });

  // 참여 버튼 핸들러
  const handleJoin = () => {
    if (!quantity) {
      alert('수량을 입력해주세요.');
      return;
    }
    handleSSEUpdate(communityPostIdNumber);
    joinMutation(
      { communityPostId: communityPostIdNumber, quantity },
      {
        onSuccess: () => {
          setRealTimeData((prev) => {
            const updatedParticipants = prev?.participants
              ? [
                  ...prev.participants.filter(
                    (p) => p.userId !== currentUser?.id
                  ),
                  {
                    userId: currentUser?.id || 0, // userId가 undefined일 수 있으므로 기본값 추가
                    nickname: currentUser?.nickname || '',
                    isCancelled: false,
                    isPaymentCompleted: false,
                    quantity,
                  },
                ]
              : [
                  {
                    userId: currentUser?.id || 0,
                    nickname: currentUser?.nickname || '',
                    isCancelled: false,
                    isPaymentCompleted: false,
                    quantity,
                  },
                ];

            return {
              ...prev,
              participants: updatedParticipants,
              participationCount: updatedParticipants.length,
              postStatus: prev?.postStatus || POST_STATUS.APPROVED,
              paymentCount: prev?.paymentCount || 0,
              participationStatus: 'JOIN',
            } as SSEEvent;
          });

          alert('공구 참여가 완료되었습니다.');
          queryClient.invalidateQueries({ queryKey });
        },
        onError: () => {
          alert('공구 참여에 실패했습니다.');
        },
      }
    );
  };

  // 초기 수량 설정 (참여 상태 확인)
  useEffect(() => {
    if (data?.participationStatus === 'JOIN' && joinQuantity !== null) {
      setQuantity(joinQuantity);
    }
  }, [data?.participationStatus, joinQuantity]);

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
    handleSSEUpdate(communityPostIdNumber);
    cancelMutation.mutate(undefined, {
      onSuccess: () => {
        setRealTimeData((prev) => {
          const updatedParticipants = prev?.participants?.map((p) =>
            p.userId === currentUser?.id ? { ...p, isCancelled: true } : p
          );

          return {
            ...prev,
            participants: updatedParticipants,
            participationCount: updatedParticipants?.filter(
              (p) => !p.isCancelled
            ).length,
            postStatus: prev?.postStatus || POST_STATUS.APPROVED,
            paymentCount: prev?.paymentCount || 0,
          } as SSEEvent;
        });

        alert('참여가 취소되었습니다.');
      },
      onError: () => {
        alert('참여 취소에 실패했습니다.');
      },
    });
  };

  const handleReport = () => {
    navigate(`/community/post/${communityPostId}/report`);
  };

  // 수량 변경
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    const maxAvailable = post?.availableNumber || 0;

    if (newQuantity > 0 && newQuantity <= maxAvailable) {
      setQuantity(newQuantity);
    } else {
      alert('유효한 수량을 입력하세요.');
    }
  };

  // 결제하기 페이지로 이동
  const handlePayment = () => {
    handleSSEUpdate(communityPostIdNumber);
    if (data?.participationStatus !== POST_STATUS.PAYMENT_STANDBY) {
      alert('현재 결제할 수 없는 상태입니다.');
      return;
    }

    const paymentState = {
      post: {
        title: post?.title,
        unitAmount: post?.unitAmount,
        imageUrls: post?.imageUrls,
      },
      quantity,
    };

    setRealTimeData((prev) => {
      const updatedParticipants = prev?.participants?.map((p) =>
        p.userId === currentUser?.id ? { ...p, isPaymentCompleted: true } : p
      );

      return {
        ...prev,
        participants: updatedParticipants,
        paymentCount: updatedParticipants?.filter((p) => p.isPaymentCompleted)
          .length,
        postStatus: prev?.postStatus || POST_STATUS.PAYMENT_COMPLETED,
        participationCount: updatedParticipants?.length || 0,
      } as SSEEvent;
    });

    if (isAuthor) {
      navigate(`/community/post/${communityPostId}/payment/author`, {
        state: paymentState,
      });
    } else {
      navigate(`/community/post/${communityPostId}/payment/participant`, {
        state: paymentState,
      });
    }
  };

  // 환불 요청 페이지로 이동
  const handleRefund = () => {
    handleSSEUpdate(communityPostIdNumber);
    if (data?.participationStatus === 'PAYMENT_COMPLETE') {
      const refundState = {
        post: { title: post?.title, unitAmount: post?.unitAmount },
        quantity,
      };

      setRealTimeData((prev) => {
        const updatedParticipants = prev?.participants?.map((p) =>
          p.userId === currentUser?.id ? { ...p, isPaymentCompleted: false } : p
        );

        return {
          ...prev,
          participants: updatedParticipants,
          paymentCount: updatedParticipants?.filter((p) => p.isPaymentCompleted)
            .length,
          postStatus: prev?.postStatus || POST_STATUS.APPROVED,
          participationCount: updatedParticipants?.length || 0,
        } as SSEEvent;
      });

      if (isAuthor) {
        navigate(`/community/post/${communityPostId}/refund/author`, {
          state: refundState,
        });
      } else {
        navigate(`/community/post/${communityPostId}/refund/participant`, {
          state: refundState,
        });
      }
    } else {
      alert('환불 요청이 불가능한 상태입니다.');
    }
  };

  if (!post) return <div>게시물이 없습니다.</div>;
  if (!data || !post) {
    return <div>로딩 중입니다...</div>;
  }

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
                imageUrls: post?.imageUrls || [],
                productUrl: post?.productUrl || '',
              }}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />

            <PostDetailsSection
              selectedPost={post}
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
            <TextArea readOnly value={post?.description || ''} />
          </TextAreaWrapper>

          {/* 댓글 컨테이너 */}
          <PostCommentsSection
            communityPostId={communityPostIdNumber}
            comments={
              post?.comments?.map((comment) => ({
                ...comment,
                commentId: Number(comment.commentId),
              })) || []
            }
          />
        </FormContainer>
        {isAdmin && realTimeData?.participants && (
          <>
            <SSEHandler communityPostId={communityPostIdNumber} />
            <ParticipantList />
          </>
        )}
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
