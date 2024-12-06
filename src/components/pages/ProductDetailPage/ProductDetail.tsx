import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../../common/StarRating';
import { submitOrder } from './api/submitApi';
import { addComment, deleteComment, editComment } from './api/commentApi';
import { addWishList } from './api/wishApi';
import { QueryHandler, useProductQuery } from '../../../hooks/useGetProduct';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const productId = useMemo(() => {
    if (!id || isNaN(Number(id))) {
      return null;
    }
    return Number(id);
  }, [id]);

  if (!productId) {
    return <p>잘못된 상품 ID입니다.</p>;
  }
  const { data: product, isLoading, isError } = useProductQuery(productId || 0);

  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [newCommentStar, setNewCommentStar] = useState(5);
  const [remainingTime, setRemainingTime] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();
  const isOutOfStock = product ? product.now >= product.currentStock : false;
  const isDeadlinePassed = remainingTime === '마감되었습니다.';
  const isButtonDisabled = isOutOfStock || isDeadlinePassed;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingRating, setEditingRating] = useState(5);
  useEffect(() => {
    if (!product) return;

    const calculateRemainingTime = () => {
      const now = new Date();
      const deadline = new Date(product.deadline);
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0 || product.available == false) {
        setRemainingTime('마감되었습니다.');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setRemainingTime(`${days}일 ${hours}시간 ${minutes}분 남음`);
    };

    calculateRemainingTime(); // 초기 계산
    const timer = setInterval(calculateRemainingTime, 60000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, [product]);

  const editPayload = {
    review: editingText,
    rating: editingRating,
  };

  // 더보기 버튼 클릭 시 댓글 수를 증가시키는 함수
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };
  const handleSubmit = async () => {
    const res = await submitOrder(productId, quantity);
    navigate(
      `/products/payment/${productId}?data=${encodeURIComponent(JSON.stringify(res))}`
    );
  };

  //댓글 작성
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      addComment(productId, { review: newComment, rating: newCommentStar });
      setNewComment('');
    }
  };
  const handleEditComment = (
    commentId: number,
    text: string,
    rating: number
  ) => {
    setEditingId(commentId);
    setEditingText(text);
    setEditingRating(rating);
  };

  const handleUpdateComment = async (commentId: number) => {
    editComment(commentId, editPayload);
    setEditingId(null);
    setEditingText('');
    setEditingRating(5);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setEditingRating(5);
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
  };
  if (!product) {
    return <p>상품 정보를 불러올 수 없습니다.</p>;
  }

  //할인까지 남은 수량
  const least = product.minamount - (product.initstock - product.currentStock);

  // 구매 비율 계산
  const purchasePercentage = Math.min(
    ((product.initstock - product.currentStock) / product.currentStock) * 100,
    100
  );
  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <Container>
          <ContentWrapper>
            <ImageSection>
              <Image
                src={product.url || DEFAULT_IMG}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMG;
                }}
              />
              <Stars>
                <StarRating rating={product.rating} />
              </Stars>
            </ImageSection>
            <InfoSection>
              <Title>{product.name}</Title>

              <PriceWrapper>
                <>
                  {product.available ? (
                    <>
                      <OriginalPrice>{product.originalprice}원</OriginalPrice>
                      <DiscountWrapper>
                        <DiscountedPrice>
                          {product.discountprice}원
                        </DiscountedPrice>
                        <DiscountInfo>
                          {product.minamount}개 부터 할인 적용
                        </DiscountInfo>
                      </DiscountWrapper>
                      {least > 0 && (
                        <RemainingCount>
                          할인 적용까지 {least}개 남음
                        </RemainingCount>
                      )}
                    </>
                  ) : (
                    <UnavailablePrice>∞ (판매 종료)</UnavailablePrice>
                  )}
                </>
              </PriceWrapper>
              {product.available && (
                <Description>{product.description}</Description>
              )}
              <DeadlineLabel>{remainingTime}</DeadlineLabel>

              <StockWrapper>
                <StockLabel>현재 구매 현황</StockLabel>
                <StockBar>
                  <StockFill style={{ width: `${purchasePercentage}%` }} />
                </StockBar>
                <StockStatus>
                  {product.initstock - product.currentStock} /{' '}
                  {product.initstock} 구매됨
                </StockStatus>
              </StockWrapper>
              <ActionWrapper>
                <QuantityWrapper>
                  <QuantityLabel>수량</QuantityLabel>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </QuantityWrapper>
                <ButtonWrapper>
                  <PurchaseButton
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}
                  >
                    구매하기
                  </PurchaseButton>
                  <WishButton
                    type="button"
                    onClick={() => {
                      addWishList(product.id);
                    }}
                  >
                    찜하기
                  </WishButton>
                </ButtonWrapper>
              </ActionWrapper>
            </InfoSection>
          </ContentWrapper>

          <CommentSection>
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentInputWrapper>
                <CommentInput
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                />
                <StarSelector
                  value={newCommentStar}
                  onChange={(e) => setNewCommentStar(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {'⭐'.repeat(num)}
                    </option>
                  ))}
                </StarSelector>
                <CommentSubmitButton type="submit">
                  댓글 달기
                </CommentSubmitButton>
              </CommentInputWrapper>
            </CommentForm>{' '}
            <div>
              {product.reviews.slice(0, visibleCount).map((review, index) => (
                <Comment key={index}>
                  {editingId === index ? (
                    <EditCommentForm>
                      <EditInput
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <StarSelector
                        value={editingRating}
                        onChange={(e) =>
                          setEditingRating(Number(e.target.value))
                        }
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {'⭐'.repeat(num)}
                          </option>
                        ))}
                      </StarSelector>
                      <EditActions>
                        <ActionButton
                          onClick={() => handleUpdateComment(index)}
                          color="primary"
                        >
                          저장
                        </ActionButton>
                        <ActionButton
                          onClick={handleCancelEdit}
                          color="secondary"
                        >
                          취소
                        </ActionButton>
                      </EditActions>
                    </EditCommentForm>
                  ) : (
                    <>
                      <CommentContent>
                        <CommentText>{review.review}</CommentText>
                        <CommentStars>
                          {'⭐'.repeat(review.rating)}
                        </CommentStars>
                      </CommentContent>
                      <CommentActions>
                        <ActionButton
                          onClick={() =>
                            handleEditComment(
                              index,
                              review.review,
                              review.rating
                            )
                          }
                        >
                          수정
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleDeleteComment(index)}
                        >
                          삭제
                        </ActionButton>
                      </CommentActions>
                    </>
                  )}
                </Comment>
              ))}

              {/* 더보기 버튼*/}
              <ButtonContainer>
                {visibleCount < product.reviews.length && (
                  <ViewMore onClick={handleShowMore}>더보기</ViewMore>
                )}
              </ButtonContainer>
            </div>
          </CommentSection>
        </Container>
      </QueryHandler>
    </>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
`;

const ImageSection = styled.div`
  position: relative;
  flex: 1;
  @media (min-width: 576px) and (max-width: 767px) {
    height: 300px;
    width: 300px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  object-fit: cover;
  @media (min-width: 576px) and (max-width: 767px) {
    height: 300px;
    width: 300px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Stars = styled.div`
  position: absolute;
  font-size: 20px;
  color: #ffaa00;
  bottom: 80px;
  right: 2%;

  @media (min-width: 768px) and (max-width: 1024px) {
    bottom: 80px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    bottom: 10px;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  @media (min-width: 576px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const UnavailablePrice = styled.div`
  font-size: 2.3rem;
  color: gray;
`;
const DiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DiscountInfo = styled.div`
  font-size: 14px;
  color: #888;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-left: -50%;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`;
const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #999;
  font-size: 18px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`;

const DiscountedPrice = styled.div`
  font-weight: bold;
  color: #ff4d4f;
  font-size: 24px;
  @media (min-width: 576px) and (max-width: 767px) {
    margin-top: -10px;
    font-size: 18px;
  }
`;
const RemainingCount = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #fff3f3;
  border: 1px solid #ffcdd2;
  border-radius: 20px;
  padding: 8px 16px;
  color: #ff4d4f;
  font-size: 14px;
  font-weight: 600;
  &::before {
    content: '🏷️';
    margin-right: 8px;
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 220px;
  }
`;

const Description = styled.p`
  margin-bottom: 30px;
  line-height: 1.6;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 576px) and (max-width: 767px) {
    -webkit-line-clamp: 2;
  }
`;
const DeadlineLabel = styled.div`
  font-size: 16px;
  color: #ff4d4f;
  margin-bottom: 20px;
`;
const StockWrapper = styled.div`
  margin-bottom: 20px;
`;

const StockLabel = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
`;

const StockBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const StockFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
`;

const StockStatus = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #555;
`;
const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 576px) and (max-width: 767px) {
    margin-top: -40px;
    margin-left: -340px;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 120px;
  font-size: 16px;
  border-radius: 8px;
  padding: 10px 15px;
`;

const QuantityLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PurchaseButton = styled.button<{ disabled?: boolean }>`
  flex: 2;
  padding: 15px;
  background-color: ${({ disabled }) => (disabled ? '#d1d5db' : '#2563eb')};
  color: ${({ disabled }) => (disabled ? '#9ca3af' : 'white')};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  pointer-events: ${({ disabled }) =>
    disabled ? 'none' : 'auto'}; /* 비활성화 시 클릭 불가 */

  &:hover {
    cursor: ${({ disabled }) =>
      disabled
        ? 'not-allowed'
        : 'pointer'}; /* 비활성화 상태에서 hover 시 커서 변경 */
    background-color: ${({ disabled }) => (disabled ? '#d1d5db' : 'white')};
    color: ${({ disabled }) => (disabled ? '#9ca3af' : '#2563eb')};
    border: ${({ disabled }) => (disabled ? 'none' : '1px solid #2563eb')};
  }
`;

const WishButton = styled.button`
  flex: 1;
  padding: 15px;
  background-color: white;
  color: #2563eb;
  border: 1px solid #2563eb;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #2563eb;
    color: white;
  }
`;

const CommentSection = styled.div`
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`;

const CommentForm = styled.form`
  margin-bottom: 20px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StarSelector = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const CommentSubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const CommentActions = styled.div`
  margin-left: 10px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;
const Comment = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover ${CommentActions} {
    opacity: 1;
  }
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const CommentText = styled.span`
  flex: 1;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2563eb;
    border-color: #2563eb;
    color: white;
  }
`;

const CommentStars = styled.div`
  font-size: 16px;
  color: #ffaa00;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ViewMore = styled.button`
  margin-top: 20px;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 8px;
  width: 200px;
  height: 40px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background-color: #2563eb;
    color: white;
  }
`;
const EditCommentForm = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 4px;
`;
export default ProductDetail;
