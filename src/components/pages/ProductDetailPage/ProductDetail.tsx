import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../../common/StarRating';
import { submitOrder } from './api/submitApi';
import {
  QueryHandler,
  useProductQuery,
  useWishQuery,
} from '../../../hooks/useGetProduct';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import CommentComponent from './CommentComponent';
import { useQuantity } from '../../../context/QuantityContext';
import { postWishProduct } from '../HomePage/api/wish';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const productId = useMemo(
    () => (id && !isNaN(Number(id)) ? Number(id) : null),
    [id]
  );

  if (!productId) {
    return <p>잘못된 상품 ID입니다.</p>;
  }

  const { data: product, isLoading, isError } = useProductQuery(productId || 0);
  console.log(product);
  const { quantity, setQuantity } = useQuantity();
  const [remainingTime, setRemainingTime] = useState('');
  const navigate = useNavigate();
  const isSoldOut = product
    ? product.initstock - product.currentStock >= product.initstock
    : false;
  const isOutOfStock = product ? product.currentStock <= 0 || isSoldOut : false;
  const isDeadlinePassed = remainingTime === '마감되었습니다.';
  const isButtonDisabled = isOutOfStock || isDeadlinePassed;
  useEffect(() => {
    if (!product) return;

    const calculateRemainingTime = () => {
      const now = new Date();
      const deadline = new Date(product.deadline);
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0 || product.available === false) {
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

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 60000);

    return () => clearInterval(timer);
  }, [product]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  const { data: wish } = useWishQuery();

  // 상태를 관리하기 위한 useState 훅. 초기값은 빈 배열로 설정.
  const [likedProducts, setLikedProducts] = useState<number[]>(() =>
    wish ? wish.map((item) => item.productPostId) : []
  );

  const changeLike = async (productPostId: number) => {
    setLikedProducts(
      (prev) =>
        prev.includes(productPostId) // productPostId가 이미 likedProducts에 포함되어 있으면
          ? prev.filter((id) => id !== productPostId) // 제거
          : [...prev, productPostId] // 추가
    );

    // 서버에 좋아요 요청 전송
    await postWishProduct({ productPostId });
  };

  const handleSubmit = async () => {
    await submitOrder(productId, quantity);
    navigate(`/products/payment/${productId}`);
  };

  if (!product) {
    return <p>상품 정보를 불러올 수 없습니다.</p>;
  }

  const least = product.minamount - (product.initstock - product.currentStock);
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
                onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
              />
              <Stars>
                <StarRating rating={product.rating} />
              </Stars>
            </ImageSection>
            <InfoSection>
              <Title>{product.name}</Title>
              <PriceWrapper>
                {product.available ? (
                  <>
                    <OriginalPrice>{product.originalprice}원</OriginalPrice>
                    <DiscountWrapper>
                      <DiscountedPrice>
                        {product.discountprice}원
                      </DiscountedPrice>
                      <DiscountInfo>
                        {product.minamount}개부터 할인 적용
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
              </PriceWrapper>{' '}
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
                  {isOutOfStock && <SoldOutBadge>재고 소진</SoldOutBadge>}
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
                    onClick={() => changeLike(productId)}
                    $isLiked={likedProducts.includes(productId)}
                  >
                    {likedProducts.includes(productId) ? '찜 취소' : '찜하기'}
                  </WishButton>
                </ButtonWrapper>
              </ActionWrapper>
            </InfoSection>
          </ContentWrapper>
          <CommentComponent productId={productId} />
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
  bottom: 13%;
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
const SoldOutBadge = styled.span`
  display: inline-block;
  margin-left: 10px;
  padding: 2px 8px;
  background-color: #ef4444;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
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
const WishButton = styled.button<{ $isLiked: boolean }>`
  flex: 1;
  padding: 15px;
  background-color: ${(props) => (props.$isLiked ? '#2563eb' : 'white')};
  color: ${(props) => (props.$isLiked ? 'white' : '#2563eb')};
  border: 1px solid #2563eb;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #2563eb;
    color: white;
  }
`;

export default ProductDetail;
