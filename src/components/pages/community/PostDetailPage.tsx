import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Post, defaultPost } from './api/postApi';
// import { fetchPostById, deletePostsById, joinPost, cancelJoinPost, Post } from './api/postApi'; // 실제 API 사용 관련 주석 처리
import { mockCommunityPosts } from '../../../mocks/communityPosts';
import {
  FaBackspace,
  FaAngleLeft,
  FaAngleRight,
  FaCommentDots,
  FaPlusCircle,
  FaMinusCircle,
} from 'react-icons/fa';

// 로그인된 사용자의 ID (Mock 처리)
const currentUserId = 'user-00001'; // 실제 구현 시, 인증된 사용자 ID를 받아와야 함

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>(defaultPost);
  const [quantity, setQuantity] = useState(1); // 기본 최소 수량
  const [isAuthor, setIsAuthor] = useState(false); // 현재 사용자가 작성자인지 여부
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    if (!postId) {
      navigate('/community');
      return;
    }

    const loadPost = async () => {
      try {
        // 실제 API 요청 (주석 처리된 부분)
        // const fetchedPost = await fetchPostById(postId!);

        // Mock 데이터 사용
        const fetchedPost = mockCommunityPosts.find(
          (item) => item.postId === postId
        );
        if (fetchedPost) {
          setPost(fetchedPost);
          setQuantity(Math.max(1, fetchedPost.currentQuantity)); // 최소 수량 설정
          setIsAuthor(fetchedPost.authorId === currentUserId); // 작성자 여부 확인
        } else {
          throw new Error('게시물이 존재하지 않습니다.');
        }
      } catch (error) {
        console.error('게시물 조회 중 오류 발생:', error);
        alert('게시물을 불러오는 데 실패했습니다.');
        navigate('/community');
      }
    };

    loadPost();
  }, [postId, navigate]);

  useEffect(() => {
    if (post) {
      const isCancelled = post.participants.some(
        (participant) =>
          participant.userId === currentUserId && participant.isCancelled
      );

      if (isCancelled) {
        alert('참여를 취소한 게시물에는 접근할 수 없습니다.');
        navigate('/community'); // 리다이렉트
      }
    }
  }, [post, navigate]);

  const handleDelete = async () => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      try {
        // await deletePostById(postId!); // API 호출
        alert('게시물이 성공적으로 삭제되었습니다.');
        navigate('/community'); // 삭제 후 커뮤니티 목록으로 이동
      } catch (error) {
        console.error(`게시물 ${postId} 삭제 중 오류 발생:`, error);
        alert('게시물 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleNextImage = () => {
    if (post) setCurrentIndex((prev) => (prev + 1) % post.images.length);
  };

  const handlePreviousImage = () => {
    if (post)
      setCurrentIndex(
        (prev) => (prev - 1 + post.images.length) % post.images.length
      );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const calculateRemainingTime = (endTime: string) => {
    const now = new Date().getTime();
    const targetTime = new Date(endTime).getTime();
    const diff = targetTime - now;

    if (diff <= 0) return '마감되었습니다.';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
  };

  useEffect(() => {
    const targetDate = post?.closeAt; // 모집 마감 시간을 가져옵니다.
    if (!targetDate) return;

    const updateRemainingTime = () => {
      const formattedTime = calculateRemainingTime(targetDate);
      setRemainingTime(formattedTime);
    };

    updateRemainingTime(); // 초기 계산

    const timer = setInterval(updateRemainingTime, 1000); // 1초마다 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [post]);

  const handleJoin = async () => {
    if (
      window.confirm('참여를 확정하시겠습니까? 이후에는 수정이 불가능합니다.')
    ) {
      try {
        // await joinPost(postId!, currentUserId, quantity);
        alert('참여가 완료되었습니다.');
        setPost((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            currentQuantity: prev.currentQuantity + quantity,
            participants: [
              ...prev.participants,
              { userId: currentUserId, quantity, isCancelled: false },
            ],
          };
        });
        navigate(0); // 페이지 새로고침
      } catch (error) {
        console.error('참여 중 오류 발생:', error);
        alert('참여 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleCancel = async () => {
    if (
      window.confirm('취소 후 다시 참여할 수 없습니다. 정말 취소하시겠습니까?')
    ) {
      try {
        // await cancelJoinPost(postId!, currentUserId);
        alert('참여가 취소되었습니다.');
        setPost((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            currentQuantity: prev.currentQuantity - quantity,
            participants: prev.participants.map((p) =>
              p.userId === currentUserId ? { ...p, isCancelled: true } : p
            ),
          };
        });
        navigate(0); // 페이지 새로고침
      } catch (error) {
        console.error('참여 취소 중 오류 발생:', error);
        alert('참여 취소 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const isParticipant =
    post?.participants?.some(
      (participant) =>
        participant.userId === currentUserId && !participant.isCancelled
    ) || false;

  const handleReport = () => {
    navigate(`/community/posts/${postId}/report`);
  };

  const handleQuantityChange = (change: number) => {
    if (post) {
      const newQuantity = quantity + change;
      if (
        newQuantity >= 1 &&
        newQuantity <= post.requiredQuantity - post.currentQuantity
      ) {
        setQuantity(newQuantity);
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <PostDetailContainer>
      <ContentWrapper>
        <Header>
          <Title>{post.title}</Title>
          <HeaderWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <FaBackspace size={24} />
            </BackButton>
            <HeaderButtonsWrapper>
              {isAuthor ? (
                <>
                  <HeaderButton
                    onClick={() => navigate(`/community/posts/${postId}/edit`)}
                  >
                    글 수정
                  </HeaderButton>
                  <HeaderButton onClick={handleDelete}>글 삭제</HeaderButton>
                </>
              ) : (
                <HeaderButton onClick={handleReport}>글 신고</HeaderButton>
              )}
            </HeaderButtonsWrapper>
          </HeaderWrapper>
        </Header>

        <FormContainer>
          <ImageAndDetailsContainer>
            {/* 이미지 섹션 */}
            <ImageContainer>
              <ImagePreviewWrapper>
                <PreviousButtonWrapper>
                  {post.images.length > 1 && currentIndex > 0 && (
                    <PreviousButton onClick={handlePreviousImage}>
                      <FaAngleLeft size={20} />
                    </PreviousButton>
                  )}
                </PreviousButtonWrapper>

                <ImagePreview>
                  <img
                    src={post.images[currentIndex]}
                    alt={`이미지 ${currentIndex + 1}`}
                  />
                </ImagePreview>

                <NextButtonWrapper>
                  {post.images.length > 1 &&
                    currentIndex < post.images.length - 1 && (
                      <NextButton onClick={handleNextImage}>
                        <FaAngleRight size={20} />
                      </NextButton>
                    )}
                </NextButtonWrapper>
              </ImagePreviewWrapper>

              {/* PaginationDots는 이미지 아래에 위치 */}
              <PaginationDotsWrapper>
                {post.images.length > 1 && (
                  <PaginationDots>
                    {post.images.map((_, index) => (
                      <span
                        key={index}
                        className={currentIndex === index ? 'active' : ''}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </PaginationDots>
                )}
              </PaginationDotsWrapper>

              <UrlContainer>
                <Label htmlFor="urlInput">URL 주소</Label>
                <Url>{post.url}</Url>
              </UrlContainer>
            </ImageContainer>

            <DetailsAndInfoContainer>
              {/* 상세 정보 섹션 */}
              <DetailsContainer>
                <Detail>
                  <Label>제목</Label>
                  <DetailText>{post.title}</DetailText>
                </Detail>
                <DoubleWrapper>
                  <AuthorDetail>
                    <Label>작성자</Label>
                    <AuthorNicknameAndChatIcon>
                      {post.authorNickname}{' '}
                      <ChatIcon
                        onClick={() => alert('작성자와 1:1 채팅방 생성')}
                      >
                        <FaCommentDots />
                      </ChatIcon>
                    </AuthorNicknameAndChatIcon>
                  </AuthorDetail>
                  <CreatedAtDetail>
                    <Label>작성일</Label>{' '}
                    {new Date(post.createdAt).toLocaleString()}
                  </CreatedAtDetail>
                </DoubleWrapper>
                <DoubleWrapper>
                  <Detail>
                    <Label>카테고리</Label> {post.category}
                  </Detail>
                  <Detail>
                    <Label>참여 현황</Label> {post.currentQuantity}
                    {' / '}
                    {post.requiredQuantity}
                  </Detail>
                </DoubleWrapper>

                <Detail>
                  <Label>모집 마감</Label> {remainingTime}
                </Detail>
                <DoubleWrapper>
                  <Detail>
                    <Label>총 가격</Label> {post.totalPrice.toLocaleString()} 원
                  </Detail>
                  <Detail>
                    <Label>개당 가격</Label> {post.unitPrice.toLocaleString()}{' '}
                    원
                  </Detail>
                </DoubleWrapper>

                <DoubleWrapper>
                  <Detail>
                    <Label>수량</Label>{' '}
                    <Quantity>
                      <FaMinusCircle onClick={() => handleQuantityChange(-1)} />
                      <span>{quantity}</span>
                      <FaPlusCircle onClick={() => handleQuantityChange(1)} />
                    </Quantity>
                  </Detail>
                  <ActionButtons>
                    {isParticipant ? (
                      <ActionButton onClick={handleCancel}>
                        취소하기
                      </ActionButton>
                    ) : (
                      <ActionButton primary onClick={handleJoin}>
                        참여하기
                      </ActionButton>
                    )}
                  </ActionButtons>
                </DoubleWrapper>
              </DetailsContainer>
            </DetailsAndInfoContainer>
          </ImageAndDetailsContainer>

          {/* 내용 섹션 */}
          <TextAreaWrapper>
            <TextArea readOnly value={post.content} />
          </TextAreaWrapper>
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 470px; /* 고정된 높이 설정 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 버튼 공간 확보 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 320px; /* 기준 높이 */
  position: relative; /* 자식 요소 위치 기준 */
  overflow: hidden; /* 높이를 벗어난 콘텐츠 숨김 */
`;

const ImagePreview = styled.div`
  flex: 1; /* 이미지 영역이 버튼 사이에 위치 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden; /* 콘텐츠가 영역을 벗어나지 않도록 */

  img {
    max-width: 100%; /* 부모 너비를 넘지 않도록 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 */
    object-fit: contain; /* 비율을 유지하며 부모 크기 안에 맞춤 */
  }
`;

const PreviousButtonWrapper = styled.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`;

const NextButtonWrapper = styled.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`;

const PreviousButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const NextButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const PaginationDotsWrapper = styled.div`
  width: 100%;
  height: 54px; /* 높이 설정 */
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
  }

  span.active {
    background: #000;
  }
`;

const UrlContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  label {
    font-weight: bold;
  }
`;

const Url = styled.div`
  flex: 1;
  padding: 10px;
  border: 1px none;
  border-radius: 5px;
`;

const DetailsAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: space-between; /* 위아래 요소 간격 균등 */
  width: 490px;
  max-width: 490px; /* 최대 너비 고정 */
  height: 470px; /* ImageUploadContainer와 동일한 고정 높이 */
  flex-grow: 1; /* 가로 공간을 균등 분배 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 컴포넌트 간 간격 */
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px; /* Label과 텍스트 사이 간격 */
`;

const DetailText = styled.span`
  display: -webkit-box; /* Flexbox 기반으로 동작 */
  -webkit-line-clamp: 2; /* 두 줄까지만 표시 */
  -webkit-box-orient: vertical; /* 수직 방향 박스 정렬 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
  white-space: normal; /* 줄바꿈 허용 */
  color: #333; /* 텍스트 색상 */
`;

const DoubleWrapper = styled.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 양쪽 여백 균등 배치 */
  width: 100%; /* 부모 컨테이너 너비 */

  & > div {
    flex: 1; /* 내부 요소들이 동일한 크기로 영역 나눔 */
  }
`;

const AuthorDetail = styled.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`;

const AuthorNicknameAndChatIcon = styled.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로로 가운데 정렬 */
  gap: 8px; /* 닉네임과 ChatIcon 사이 간격 */
  font-size: 1rem; /* 텍스트 크기 설정 */
`;

const CreatedAtDetail = styled.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`;

const ChatIcon = styled.span`
  cursor: pointer;
  margin-left: 10px;
`;

const Quantity = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
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

const ActionButtons = styled.div`
  display: flex;
  justify-content: right; /* 버튼을 가운데 정렬 */
  align-items: center; /* 세로 정렬 */
  gap: 10px; /* 버튼 간 간격 */
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;
