import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useRemainingTime } from '../../../hooks/useGetPage';
import { usePostQuery } from '../../../hooks/useGetPost';
import { QueryHandler } from '../../../hooks/useGetProduct';
import { useQuantity } from '../../../context/QuantityContext';

const PostDetailPage: React.FC = () => {
  const { communityPostId } = useParams<{ communityPostId: string }>();
  const navigate = useNavigate();
  const postId = Number(communityPostId);
  const userId = localStorage.getItem('userid');

  // React Query로 데이터 가져오기
  const [checkParticiapant, setParticiapant] = useState(false);
  const {
    data: post,
    isLoading,
    isError,
  } = usePostQuery(postId, checkParticiapant);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { saveQuantity, getQuantity } = useQuantity();

  const joinQuantity = getQuantity(userId!, String(postId));

  // 초기 수량 설정 (참여 상태 확인)
  useEffect(() => {
    if (post?.participationStatus === 'JOIN') {
      setQuantity(joinQuantity);
    }
  }, [post?.participationStatus, joinQuantity]);

  const [quantity, setQuantity] = useState<number>(joinQuantity);

  const isParticipant =
    post?.participationStatus === 'JOIN' ||
    post?.participationStatus === 'PAYMENT_STANDBY';
  const isNotParticipant = !isParticipant; // isParticipant가 false면 true가 됨

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
      saveQuantity(userId!, String(postId), quantity);
      alert('공구에 성공적으로 참여했습니다.');
      setParticiapant(true);
    } catch {
      alert('공구 참여에 실패했습니다. 다시 시도해주세요.');
    }
  };
  // 취소 버튼 핸들러
  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      '취소하면 다시는 참여가 불가능합니다. 정말 취소하시겠습니까?'
    );

    if (!confirmCancel) return;

    try {
      await cancelJoinPost(postId);
      alert('공구 참여를 취소했습니다.');
      setParticiapant(false);
    } catch {
      alert('공구 참여 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

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

    if (post?.isWriter) {
      navigate(`/community/post/${communityPostId}/payment/author`, {
        state: quantity,
      });
    } else {
      navigate(`/community/post/${communityPostId}/payment/participant`, {
        state: quantity,
      });
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
                postId={postId}
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
                handlePayment={handlePayment}
                handleDelete={handleDelete}
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
            <PostCommentsSection communityPostId={postId} />
          </FormContainer>
        </ContentWrapper>
      </PostDetailContainer>
    </QueryHandler>
  );
};

const PostDetailContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
`;

const ContentWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background-color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #2563eb;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const ImageAndDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const TextAreaWrapper = styled.div`
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;

  font-size: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  resize: vertical;
  background-color: #f9fafb;
  color: #475569;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;
export default PostDetailPage;
