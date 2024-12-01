import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  fetchPostById,
  deletePostById,
  joinPost,
  cancelJoinPost,
  addComment,
  deleteComment,
  updateComment,
  Post,
  defaultPost,
  POST_STATUS,
} from './api/postApi'; // 실제 API 사용 관련 주석 처리
import {
  FaBackspace,
  FaAngleLeft,
  FaAngleRight,
  FaPlusCircle,
  FaMinusCircle,
} from 'react-icons/fa';
import { webSocketService } from '../../../utils/webSocket';

// 로그인된 사용자의 ID (Mock 처리)
const currentUserId = 'user-00001'; // 실제 구현 시, 인증된 사용자 ID를 받아와야 함

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [post, setPost] = useState<Post>(defaultPost);
  const [quantity, setQuantity] = useState(1); // 기본 최소 수량
  const [isAuthor, setIsAuthor] = useState(false); // 현재 사용자가 작성자인지 여부
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [paymentRemainingTime, setPaymentRemainingTime] = useState<string>(''); // 결제 마감 시간 상태 추가
  const [newCommentContent, setNewCommentContent] = useState<string>(''); // 댓글 입력 필드
  const [editCommentId, setEditCommentId] = useState<string | null>(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState<string>(''); // 수정 중인 댓글 내용

  // 게시물 데이터 가져오기
  const {
    data: fetchedPost,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['postDetail', postId] as const,
    queryFn: () => fetchPostById(postId!),
    enabled: Boolean(postId),
  });

  // fetchedPost 상태 처리 및 초기화
  useEffect(() => {
    if (fetchedPost) {
      setPost(fetchedPost);

      // 참여자 목록에서 현재 사용자의 수량을 찾아 설정
      const participant = fetchedPost.participants.find(
        (p) => p.userId === currentUserId && !p.isCancelled
      );

      if (participant) {
        // 이미 결제를 완료한 경우 사용자의 수량을 설정
        setQuantity(participant.quantity);
      } else {
        // 기본 수량을 설정 (참여하지 않은 경우)
        setQuantity(1);
      }

      // 작성자인지 여부 확인
      setIsAuthor(fetchedPost.authorId === currentUserId);

      // 취소한 사용자인 경우 접근 차단
      const isCancelled = fetchedPost.participants.some(
        (participant) =>
          participant.userId === currentUserId && participant.isCancelled
      );

      if (isCancelled) {
        alert('참여를 취소한 게시물에는 접근할 수 없습니다.');
        navigate('/community');
      }
    }
  }, [fetchedPost, currentUserId, navigate]);

  useEffect(() => {
    if (isError) {
      alert('게시물을 불러오는 데 실패했습니다.');
      navigate('/community');
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (postId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleIncomingData = (data: any) => {
        if (data.type === 'STATUS_UPDATE') {
          setPost((prev) => ({ ...prev, status: data.status }));
        } else if (data.type === 'USER_UPDATE') {
          setPost((prev) => ({
            ...prev,
            participants: data.participants,
            cancelledUsers: data.cancelledUsers,
          }));
        }
      };

      webSocketService.connect(
        handleIncomingData,
        () => console.log('WebSocket connected'),
        () => console.log('WebSocket disconnected'),
        (error) => console.error('WebSocket error:', error)
      );

      return () => {
        webSocketService.close();
      };
    }
  }, [postId]);

  useEffect(() => {
    const targetDate = post?.closeAt;
    if (!targetDate) return;

    const calculateRemainingTime = (endTime: string) => {
      const now = new Date().getTime();
      const targetTime = new Date(endTime).getTime();
      const diff = targetTime - now;

      if (diff <= 0) return '마감되었습니다.';

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
    };

    const updateRemainingTime = () => {
      const formattedTime = calculateRemainingTime(targetDate);
      setRemainingTime(formattedTime);
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [post]);

  useEffect(() => {
    // 결제 마감 시간 계산 및 업데이트
    if (post.status === POST_STATUS.PAYMENT_STANDBY && post.stateUpdatedAt) {
      const countdownTarget =
        new Date(post.stateUpdatedAt).getTime() + 12 * 60 * 60 * 1000; // 12시간 후
      const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const diff = countdownTarget - now;

        if (diff <= 0) return '결제 마감되었습니다.';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
      };

      const updateRemainingTime = () => {
        const formattedTime = calculateRemainingTime();
        setPaymentRemainingTime(formattedTime);
      };

      updateRemainingTime();
      const timer = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(timer);
    } else {
      setPaymentRemainingTime('');
    }
  }, [post]);

  // 게시물 삭제
  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePostById(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      alert('게시물이 삭제되었습니다.');
      navigate('/community');
    },
    onError: (error) => {
      console.error(error);
      alert('게시물 삭제에 실패했습니다.');
    },
  });

  // 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      deletePostMutation.mutate(postId!); // postId를 전달
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

  // 참여하기
  const joinMutation = useMutation({
    mutationFn: () => joinPost(postId!, currentUserId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
      alert('참여가 완료되었습니다.');
    },
    onError: () => {
      alert('참여에 실패했습니다.');
    },
  });

  const handleJoin = () => {
    if (post.status === POST_STATUS.APPROVED) {
      joinMutation.mutate();
    } else {
      alert('현재 참여할 수 없는 상태입니다.');
    }
  };

  // 참여 취소
  const cancelMutation = useMutation({
    mutationFn: () => cancelJoinPost(postId!, currentUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
      alert('참여가 취소되었습니다.');
      navigate('/community');
    },
    onError: () => {
      alert('참여 취소에 실패했습니다.');
    },
  });

  const handleCancel = () => {
    if (
      post.status === POST_STATUS.APPROVED ||
      post.status === POST_STATUS.PAYMENT_STANDBY
    ) {
      cancelMutation.mutate();
    } else {
      alert('현재 취소할 수 없는 상태입니다.');
    }
  };

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

  const isParticipant =
    post?.participants?.some(
      (participant) =>
        participant.userId === currentUserId && !participant.isCancelled
    ) || false;

  // 댓글 작성
  const addCommentMutation = useMutation({
    mutationFn: () => addComment(postId!, currentUserId, newCommentContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
      setNewCommentContent('');
    },
    onError: () => {
      alert('댓글 작성에 실패했습니다.');
    },
  });

  const handleAddComment = () => {
    if (!newCommentContent.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    if (newCommentContent.length > 300) {
      alert('댓글은 최대 300자까지만 입력 가능합니다.');
      return;
    }
    addCommentMutation.mutate();
  };

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(postId!, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
    },
    onError: () => {
      alert('댓글 삭제에 실패했습니다.');
    },
  });

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  // 댓글 수정
  const handleEditComment = (commentId: string, content: string) => {
    setEditCommentId(commentId); // 수정할 댓글 ID 설정
    setEditContent(content); // 현재 댓글 내용 불러오기
  };

  const updateCommentMutation = useMutation({
    mutationFn: () => updateComment(postId!, editCommentId!, editContent), // 수정할 댓글 ID와 새로운 내용 전달
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
      setEditCommentId(null);
      setEditContent('');
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다.');
    },
  });

  const handleUpdateComment = () => {
    if (!editContent.trim()) {
      alert('수정할 댓글 내용을 입력하세요.');
      return;
    }
    if (editContent.length > 300) {
      alert('댓글은 최대 300자까지만 입력 가능합니다.');
      return;
    }
    updateCommentMutation.mutate();
  };

  // 결제하기 페이지로 이동
  const handlePayment = () => {
    if (post.status === POST_STATUS.PAYMENT_STANDBY) {
      navigate(`/community/posts/${postId}/payment`);
    } else {
      alert('현재 결제할 수 없는 상태입니다.');
    }
  };

  // 환불 요청 페이지로 이동
  const handleRefund = () => {
    // 현재 사용자가 결제를 완료했는지 확인
    const participant = post.participants.find(
      (p) =>
        p.userId === currentUserId &&
        !p.isCancelled && // 취소되지 않은 상태
        p.isPaymentCompleted // 결제 완료 상태
    );

    if (participant) {
      // 결제를 완료한 사용자만 이동
      navigate(`/community/posts/${postId}/refund`);
    } else {
      alert('환불 요청은 결제를 완료한 이용자만 가능합니다.');
    }
  };

  // 모집 완료 상태에서 참여자만 접근 가능하도록 제한
  useEffect(() => {
    if (post.status === POST_STATUS.COMPLETED && !isParticipant) {
      alert('모집이 완료되어 더 이상 접근할 수 없습니다.');
      navigate('/community');
    }
  }, [post.status, isParticipant, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>게시물이 없습니다.</div>;

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
                <UrlWrapper>
                  <Label htmlFor="urlInput">URL 주소</Label>
                  <Url>{post.url}</Url>
                </UrlWrapper>
              </UrlContainer>
            </ImageContainer>

            <DetailsAndInfoContainer>
              {/* 상세 정보 섹션 */}
              <DetailsContainer>
                <Detail>
                  <Label>제목</Label>
                  <DetailText>
                    {post.title}
                    {post.status === POST_STATUS.NOT_APPROVED && (
                      <span style={{ marginLeft: '8px', color: 'red' }}>
                        관리자의 승인을 대기 중입니다.
                      </span>
                    )}
                  </DetailText>
                </Detail>
                <DoubleWrapper>
                  <AuthorDetail>
                    <Label>작성자</Label>
                    <AuthorNickname>{post.authorNickname}</AuthorNickname>
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

                <DoubleWrapper>
                  <Detail>
                    <Label>모집 마감</Label> {remainingTime}
                  </Detail>
                  {/* 결제 마감 시간이 추가되는 부분 */}
                  {post?.status === POST_STATUS.PAYMENT_STANDBY && (
                    <Detail>
                      <Label>결제 마감</Label>
                      <DetailText>{paymentRemainingTime}</DetailText>
                    </Detail>
                  )}
                </DoubleWrapper>
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
                      {!isParticipant && ( // 참여자가 아닐 때만 수량 변경 가능
                        <>
                          <FaMinusCircle
                            onClick={() => handleQuantityChange(-1)}
                          />
                          <span>{quantity}</span>
                          <FaPlusCircle
                            onClick={() => handleQuantityChange(1)}
                          />
                        </>
                      )}
                      {isParticipant && <span>{quantity}</span>}{' '}
                      {/* 참여자일 경우 고정된 수량 표시 */}
                    </Quantity>
                  </Detail>
                  {isParticipant && ( // 참여자가 된 경우 결제 금액 추가
                    <Detail>
                      <Label>결제 금액</Label>{' '}
                      <PaymentAmount>
                        {(quantity * post.unitPrice).toLocaleString()} 원
                      </PaymentAmount>
                    </Detail>
                  )}

                  {/* 상태에 따라 렌더링되는 액션 버튼 */}
                  {post && post.status && (
                    <ActionButtons>
                      {/* 환불 요청 버튼 */}
                      {post.participants.some(
                        (p) =>
                          p.userId === currentUserId &&
                          !p.isCancelled &&
                          p.isPaymentCompleted
                      ) ? (
                        <ActionButton primary onClick={handleRefund}>
                          환불
                        </ActionButton>
                      ) : post.status === POST_STATUS.PAYMENT_STANDBY ? (
                        // 결제 대기 상태에서는 결제/취소 버튼
                        <>
                          {isParticipant && (
                            <>
                              <ActionButton primary onClick={handlePayment}>
                                결제
                              </ActionButton>
                              <ActionButton onClick={handleCancel}>
                                취소
                              </ActionButton>
                            </>
                          )}
                        </>
                      ) : post.status === POST_STATUS.APPROVED ? (
                        // 승인 완료 상태에서는 참여/취소 버튼
                        <>
                          {isParticipant ? (
                            <ActionButton onClick={handleCancel}>
                              취소
                            </ActionButton>
                          ) : (
                            <ActionButton primary onClick={handleJoin}>
                              참여
                            </ActionButton>
                          )}
                        </>
                      ) : null}
                    </ActionButtons>
                  )}
                </DoubleWrapper>
              </DetailsContainer>
            </DetailsAndInfoContainer>
          </ImageAndDetailsContainer>

          {/* 내용 섹션 */}
          <TextAreaWrapper>
            <TextArea readOnly value={post.content} />
          </TextAreaWrapper>

          {/* 댓글 컨테이너 */}
          <CommentsContainer>
            <CommentsHeader>댓글</CommentsHeader>
            <CommentsWrapper>
              {post.comments.map((comment) => (
                <Comments key={comment.commentId}>
                  <CommentHeader>
                    <CommentAuthor>{comment.userId}</CommentAuthor>
                    <CommentDate>
                      {new Date(comment.createdAt).toLocaleString()}
                    </CommentDate>
                  </CommentHeader>
                  {editCommentId === comment.commentId ? (
                    // 수정 모드: 확인 및 취소 버튼만 표시
                    <EditCommentContainer>
                      <EditCommentInput
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        maxLength={300} // 브라우저에서 강제 제한
                      />
                      <ActionButtonsWrapper>
                        <CharacterCount overLimit={editContent.length > 300}>
                          ({editContent.length}/300)
                        </CharacterCount>
                        <ActionButton onClick={handleUpdateComment}>
                          확인
                        </ActionButton>
                        <ActionButton onClick={() => setEditCommentId(null)}>
                          취소
                        </ActionButton>
                      </ActionButtonsWrapper>
                    </EditCommentContainer>
                  ) : (
                    // 일반 모드: 수정 및 삭제 버튼만 표시
                    <>
                      <CommentContent>{comment.content}</CommentContent>
                      {comment.userId === currentUserId && (
                        <CommentActions>
                          <EditCommentButton
                            onClick={() =>
                              handleEditComment(
                                comment.commentId,
                                comment.content
                              )
                            }
                          >
                            수정
                          </EditCommentButton>
                          <DeleteCommentButton
                            onClick={() =>
                              handleDeleteComment(comment.commentId)
                            }
                          >
                            삭제
                          </DeleteCommentButton>
                        </CommentActions>
                      )}
                    </>
                  )}
                </Comments>
              ))}
              <CommentInputContainer>
                <CommentInput
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  placeholder="댓글 내용을 입력해주세요."
                  maxLength={300} // 브라우저에서 강제 제한
                />
                <ActionButtonsWrapper>
                  <CharacterCount overLimit={newCommentContent.length > 300}>
                    ({newCommentContent.length}/300)
                  </CharacterCount>
                  <SubmitCommentButton onClick={handleAddComment}>
                    작성
                  </SubmitCommentButton>
                </ActionButtonsWrapper>
              </CommentInputContainer>
            </CommentsWrapper>
          </CommentsContainer>
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
  margin: 0 auto;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 세로로 가운데 정렬 */
  width: 100%;
`;

const UrlWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center; /* Label과 Url을 같은 높이에 배치 */
  gap: 10px; /* Label과 Url 사이 간격 */
  padding: 10px;
  border: none;
`;

const Url = styled.div`
  width: 285px;
  flex: 1;
  padding: 10px;
  border: none;
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

const AuthorNickname = styled.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로로 가운데 정렬 */
  font-size: 1rem; /* 텍스트 크기 설정 */
`;

const CreatedAtDetail = styled.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`;

const Quantity = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const PaymentAmount = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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

const CommentsContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const CommentsHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 40px;
  margin-bottom: 0;
`;

const CommentsWrapper = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
`;

const Comments = styled.li`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 8px;
  }
`;

const CommentDate = styled.span`
  margin-left: 20px;
  font-size: 0.9rem;
  color: #666;
`;

const CommentContent = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
  word-wrap: break-word;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const EditCommentContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  gap: 10px; /* EditCommentInput과 ActionButtonsWrapper 간격 */
`;

interface CharacterCountProps {
  overLimit?: boolean;
}

const CharacterCount = styled.span<CharacterCountProps>`
  font-size: 0.9rem;
  color: ${(props) =>
    props.overLimit ? 'red' : '#666'}; /* 300자를 초과하면 빨간색 */
  margin-right: 10px; /* 버튼과 간격 */
`;

const EditCommentInput = styled.textarea`
  width: 100%; /* CommentContent와 동일한 너비 */
  min-height: 60px; /* 기본 높이 */
  max-height: 120px; /* 최대 높이 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ececec; /* 배경색 설정 */
  font-size: 1rem; /* 글씨 크기 */
  line-height: 1.5; /* 줄 간격 */
  color: #333; /* 글씨 색상 */
  resize: none; /* 크기 조절 비활성화 */
  font-family: inherit; /* 기본 글꼴 사용 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
`;

const EditCommentButton = styled.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteCommentButton = styled.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;

const CommentInputContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 요소 간 간격 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  max-height: 120px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ececec;
  font-size: 1rem; /* CommentContent와 동일한 글꼴 크기 */
  color: #333; /* CommentContent와 동일한 텍스트 색상 */
  resize: none; /* 크기 조절 비활성화 */
  font-family: inherit;
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
`;

const SubmitCommentButton = styled.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end; /* 오른쪽 정렬 */
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;
