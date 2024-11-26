import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { getProductbyId } from './api/productDetailApi';
import styled from 'styled-components';
import { addWishList } from './api/WishApi';
import StarRating from '../../common/StarRating';
import { addComment } from './api/CommentApi';
// import { useQuery } from '@tanstack/react-query';

const ProductDetail: React.FC = () => {
  //   const { id } = useParams<{ id: string }>();

  //   const {
  //     data: product,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useQuery({
  //     queryKey: ['product', id],
  //     queryFn: async () => {
  //       if (!id) throw new Error('ID가 없습니다');
  //       return await getProductbyId(id);
  //     },
  //     enabled: !!id,
  //   });

  //   if (isLoading) return <p>로딩 중...</p>;
  //   if (isError) {
  //     return (
  //       <p>
  //         {error instanceof Error
  //           ? error.message
  //           : '상품 정보를 불러오는 데 실패했습니다.'}
  //       </p>
  //     );
  //   }

  //   if (!product) return null;
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [newCommentStar, setNewCommentStar] = useState(5);
  const [remainingTime, setRemainingTime] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  // 더보기 버튼 클릭 시 댓글 수를 증가시키는 함수
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const product = {
    id: '1',
    name: '다이슨 드라이기',
    stars: 4.7,
    minimum: 5,
    now: 3,
    stock: 10,
    originalPrice: 95.5,
    discountedPrice: 79.98,
    image: 'https://via.placeholder.com/200',
    deadline: '2024-12-31',
    description:
      '최고의 성능을 가진 드라이기 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
    comments: [
      {
        comment: '디자인도 예쁘고, 바람 세기도 강해서 너무 만족스럽습니다!',
        star: 5,
      },
      {
        comment: '가격이 조금 비싸지만, 성능은 최고예요.',
        star: 4,
      },
      {
        comment: '머리가 정말 빨리 말라서 시간 절약에 도움이 돼요.',
        star: 5,
      },
      {
        comment: '생각보다 소음이 조금 있어서 아쉬웠어요.',
        star: 3,
      },
      {
        comment: '배송이 너무 빨라서 놀랐습니다. 제품도 마음에 들어요!',
        star: 5,
      },
      {
        comment: '선물로 줬는데 상대방이 정말 좋아했어요.',
        star: 5,
      },
      {
        comment: '그립감이 좋아서 오래 사용해도 손목이 안 아파요.',
        star: 4,
      },
      {
        comment: '전문가용 드라이기 같은 성능인데, 가정용으로도 적합합니다.',
        star: 5,
      },
      {
        comment: '살짝 무겁지만, 기능이 좋아서 만족해요.',
        star: 4,
      },
      {
        comment: '내구성이 좋을 것 같아서 기대 중입니다!',
        star: 5,
      },
      {
        comment: '생각보다 소음이 조금 있어서 아쉬웠어요.',
        star: 3,
      },
      {
        comment: '배송이 너무 빨라서 놀랐습니다. 제품도 마음에 들어요!',
        star: 5,
      },
      {
        comment: '선물로 줬는데 상대방이 정말 좋아했어요.',
        star: 5,
      },
      {
        comment: '그립감이 좋아서 오래 사용해도 손목이 안 아파요.',
        star: 4,
      },
      {
        comment: '전문가용 드라이기 같은 성능인데, 가정용으로도 적합합니다.',
        star: 5,
      },
      {
        comment: '살짝 무겁지만, 기능이 좋아서 만족해요.',
        star: 4,
      },
      {
        comment: '내구성이 좋을 것 같아서 기대 중입니다!',
        star: 5,
      },
      {
        comment: '생각보다 소음이 조금 있어서 아쉬웠어요.',
        star: 3,
      },
      {
        comment: '배송이 너무 빨라서 놀랐습니다. 제품도 마음에 들어요!',
        star: 5,
      },
      {
        comment: '선물로 줬는데 상대방이 정말 좋아했어요.',
        star: 5,
      },
      {
        comment: '그립감이 좋아서 오래 사용해도 손목이 안 아파요.',
        star: 4,
      },
      {
        comment: '전문가용 드라이기 같은 성능인데, 가정용으로도 적합합니다.',
        star: 5,
      },
      {
        comment: '살짝 무겁지만, 기능이 좋아서 만족해요.',
        star: 4,
      },
      {
        comment: '내구성이 좋을 것 같아서 기대 중입니다!',
        star: 5,
      },
      {
        comment: '생각보다 소음이 조금 있어서 아쉬웠어요.',
        star: 3,
      },
      {
        comment: '배송이 너무 빨라서 놀랐습니다. 제품도 마음에 들어요!',
        star: 5,
      },
      {
        comment: '선물로 줬는데 상대방이 정말 좋아했어요.',
        star: 5,
      },
      {
        comment: '그립감이 좋아서 오래 사용해도 손목이 안 아파요.',
        star: 4,
      },
      {
        comment: '전문가용 드라이기 같은 성능인데, 가정용으로도 적합합니다.',
        star: 5,
      },
      {
        comment: '살짝 무겁지만, 기능이 좋아서 만족해요.',
        star: 4,
      },
      {
        comment: '내구성이 좋을 것 같아서 기대 중입니다!',
        star: 5,
      },
      {
        comment: '생각보다 소음이 조금 있어서 아쉬웠어요.',
        star: 3,
      },
      {
        comment: '배송이 너무 빨라서 놀랐습니다. 제품도 마음에 들어요!',
        star: 5,
      },
      {
        comment: '선물로 줬는데 상대방이 정말 좋아했어요.',
        star: 5,
      },
      {
        comment: '그립감이 좋아서 오래 사용해도 손목이 안 아파요.',
        star: 4,
      },
      {
        comment: '전문가용 드라이기 같은 성능인데, 가정용으로도 적합합니다.',
        star: 5,
      },
      {
        comment: '살짝 무겁지만, 기능이 좋아서 만족해요.',
        star: 4,
      },
      {
        comment: '내구성이 좋을 것 같아서 기대 중입니다!',
        star: 5,
      },
    ],
  };

  //   마감까지 남은 기한
  const calculateRemainingTime = () => {
    const now = new Date();
    const deadline = new Date(product.deadline);
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) {
      setRemainingTime('마감되었습니다.');

      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setRemainingTime(`${days}일 ${hours}시간 ${minutes}분 남음`);
  };

  useEffect(() => {
    calculateRemainingTime(); // 초기 계산
    const timer = setInterval(calculateRemainingTime, 60000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  const isOutOfStock = product.now >= product.stock;
  const isDeadlinePassed = remainingTime === '마감되었습니다.';
  const isButtonDisabled = isOutOfStock || isDeadlinePassed;

  // 구매 비율 계산
  const purchasePercentage = Math.min((product.now / product.stock) * 100, 100);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  //댓글 작성
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //댓글추가 api 호출
    addComment({ comment: newComment, star: newCommentStar });
    //newComment, newCommentStar <- payload로 전송
    setNewComment('');
  };

  //남은 재고
  const least = product.minimum - product.now;

  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <Image src={product.image} alt={product.name} />
          <Stars>
            <StarRating rating={product.stars} />
          </Stars>
        </ImageSection>
        <InfoSection>
          <Title>{product.name}</Title>

          <PriceWrapper>
            <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
            <DiscountWrapper>
              <DiscountedPrice>
                ${product.discountedPrice.toFixed(2)}
              </DiscountedPrice>
              <DiscountInfo>{product.minimum}개 부터 할인 적용</DiscountInfo>
            </DiscountWrapper>
            {least > 0 && (
              <RemainingCount>할인 적용까지 {least}개 남음</RemainingCount>
            )}
          </PriceWrapper>
          <Description>{product.description}</Description>
          <DeadlineLabel>{remainingTime}</DeadlineLabel>

          <StockWrapper>
            <StockLabel>현재 구매 현황</StockLabel>
            <StockBar>
              <StockFill style={{ width: `${purchasePercentage}%` }} />
            </StockBar>
            <StockStatus>
              {product.now} / {product.stock} 구매됨
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
                to={`/products/payment/${product.id}`}
                disabled={isButtonDisabled}
              >
                구매하기
              </PurchaseButton>
              <WishButton
                type="button"
                onClick={() => {
                  addWishList(product);
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
            <CommentSubmitButton type="submit">댓글 달기</CommentSubmitButton>
          </CommentInputWrapper>
        </CommentForm>{' '}
        <div>
          {product.comments.slice(0, visibleCount).map((comment, index) => (
            <Comment key={index}>
              {comment.comment}
              <CommentStars>{'⭐'.repeat(comment.star)}</CommentStars>
            </Comment>
          ))}

          {/* 더보기 버튼*/}
          <ButtonContainer>
            {visibleCount < product.comments.length && (
              <ViewMore onClick={handleShowMore}>더보기</ViewMore>
            )}
          </ButtonContainer>
        </div>
      </CommentSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  object-fit: cover;
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
  bottom: 20%;
  right: 2%;
`;

const PriceWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;
const DiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DiscountInfo = styled.div`
  font-size: 14px;
  color: #888;
`;
const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #999;
  font-size: 18px;
`;

const DiscountedPrice = styled.div`
  font-weight: bold;
  color: #ff4d4f;
  font-size: 24px;
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
`;

const Description = styled.p`
  margin-bottom: 30px;
  line-height: 1.6;
  color: #666;
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

const PurchaseButton = styled(Link)<{ disabled?: boolean }>`
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

const Comment = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default ProductDetail;
