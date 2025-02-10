import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { joinQuantityAtom } from '../../../store/postStore';
import styled from 'styled-components';
import {
  joinPost,
  cancelJoinPost,
  deletePostById,
} from '../community/api/postApi';
import { FaBackspace } from 'react-icons/fa';
import { POST_STATUS } from '../../../types/postTypes';
import PostImageSection from './PostDetailPage/PostImageSection';
import PostDetailsSection from './PostDetailPage/PostDetailsSection';
import PostCommentsSection from './PostDetailPage/PostCommentsSection';
import SSEHandler from '../../../utils/SSEHandler';
import ParticipantList from './ParticipantList';
import { useRemainingTime } from '../../../hooks/useGetPage';
import { usePostQuery } from '../../../hooks/useGetPost';
import { QueryHandler } from '../../../hooks/useGetProduct';
import { useQuantity } from '../../../context/QuantityContext';

const PostDetailPage: React.FC = () => {
  const { communityPostId } = useParams<{ communityPostId: string }>();
  const navigate = useNavigate();
  const postId = Number(communityPostId);
  const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [joinQuantity] = useAtom(joinQuantityAtom);
  const { quantity, setQuantity } = useQuantity();

  // React Query로 데이터 가져오기
  const [checkParticiapant, setParticiapant] = useState(false);
  const {
    data: post,
    isLoading,
    isError,
  } = usePostQuery(postId, checkParticiapant);

  const isParticipant =
    post?.participationStatus === 'JOIN' ||
    post?.participationStatus === 'PAYMENT_STANDBY';
  const isNotParticipant = !isParticipant; // isParticipant가 false면 true가 됨

  // SSE 구독 설정
  // usePostSSE(postId);

  // 남은 시간 계산
  const remainingTime = useRemainingTime(post?.communityPost.closeAt, 'close');
  const paymentRemainingTime = useRemainingTime(
    post?.communityPost.paymentDeadline,
    'payment'
  );

  const handleDelete = () => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      deletePostById(postId);
    }
  };

  // 참여 버튼 핸들러
  const handleJoin = async () => {
    if (!quantity) {
      alert('수량을 입력해주세요.');
      return;
    }

    try {
      await joinPost(postId, quantity);
      alert('공구에 성공적으로 참여했습니다.');
      setParticiapant(true);
    } catch {
      alert('공구 참여에 실패했습니다. 다시 시도해주세요.');
    }
  };
  // 취소 버튼 핸들러러
  const handleCancel = async () => {
    try {
      await cancelJoinPost(postId);
      alert('공구 참여를 취소했습니다.');
      setParticiapant(false);
    } catch {
      alert('공구 참여 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 초기 수량 설정 (참여 상태 확인)
  useEffect(() => {
    if (post?.participationStatus === 'JOIN' && joinQuantity !== null) {
      setQuantity(joinQuantity);
    }
  }, [post?.participationStatus, joinQuantity]);

  // 수량 변경
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    const maxAvailable = post?.communityPost.availableNumber || 0;

    if (newQuantity > 0 && newQuantity <= maxAvailable) {
      setQuantity(newQuantity);
    } else {
      alert('유효한 수량을 입력하세요.');
    }
  };

  // 결제하기 페이지로 이동
  const handlePayment = () => {
    if (post?.participationStatus !== POST_STATUS.PAYMENT_STANDBY) {
      alert('현재 결제할 수 없는 상태입니다.');
      return;
    }
    const paymentState = {
      post: {
        title: post?.communityPost.title,
        unitAmount: post?.communityPost.unitAmount,
        imageUrls: post?.communityPost.imageUrls,
      },
      quantity,
    };
    if (post?.isWriter) {
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
    if (post?.participationStatus === 'PAYMENT_COMPLETE') {
      const refundState = {
        post: {
          title: post?.communityPost.title,
          unitAmount: post?.communityPost.unitAmount,
        },
        quantity,
      };

      if (post?.isWriter) {
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

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <PostDetailContainer>
        <ContentWrapper>
          <Header>
            <Title>공구 모집 및 진행</Title>
            <HeaderWrapper>
              <BackButton onClick={() => navigate(-1)}>
                <FaBackspace size={24} />
              </BackButton>
              <HeaderButtonsWrapper>
                {post?.isWriter && (
                  <HeaderButton onClick={handleDelete}>글 삭제</HeaderButton>
                )}
              </HeaderButtonsWrapper>
            </HeaderWrapper>
          </Header>

          <FormContainer>
            <ImageAndDetailsContainer>
              {/* 이미지 섹션 */}
              <PostImageSection
                selectedPost={{
                  imageUrls: post?.communityPost.imageUrls || [],
                  productUrl: post?.communityPost.productUrl || '',
                }}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />

              <PostDetailsSection
                isWriter={post?.isWriter}
                remainQuantity={post?.remainQuantity}
                selectedPost={post?.communityPost ?? null}
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
                value={post?.communityPost.description || ''}
              />
            </TextAreaWrapper>

            {/* 댓글 컨테이너 */}
            <PostCommentsSection
              communityPostId={postId}
              comments={
                post?.communityPost.comments?.map((comment) => ({
                  ...comment,
                  commentId: Number(comment.commentId),
                })) || []
              }
            />
          </FormContainer>
          {isAdmin && (
            <>
              <SSEHandler communityPostId={postId} />
              <ParticipantList />
            </>
          )}
        </ContentWrapper>
      </PostDetailContainer>
    </QueryHandler>
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
