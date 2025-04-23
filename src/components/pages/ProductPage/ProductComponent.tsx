import React, { useEffect, useState } from 'react';
import Pagination from '../../common/Pagination';
import StarRating from '../../common/StarRating';
import { AllProducts } from '../HomePage/model/productSchema';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import { QueryHandler, useWishQuery } from '../../../hooks/useGetProduct';
import { postWishProduct } from '../HomePage/api/wish';
import {
  Card,
  CardWrapper,
  DiscountedPrice,
  OriginalPrice,
  PriceWrapper,
  ProductImg,
  ProductName,
  ProductStar,
  ProductWrapper,
  Recommend,
  StyledLink,
} from '../HomePage/style/CardStyle';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type ProductComponentProps = {
  input: string;
  products: AllProducts[];
};

const ProductComponent: React.FC<ProductComponentProps> = ({
  input,
  products,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState<
    '판매 상품' | '기한 마감 상품'
  >('판매 상품');
  const PRODUCT_PER_PAGE = 16;
  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const filteredProducts =
    selectedText === '기한 마감 상품'
      ? products.filter(
          (p) =>
            p.available === false ||
            (new Date(p.deadline) < new Date() && p.discountprice > 1)
        )
      : products.filter(
          (p) =>
            p.available === true &&
            new Date(p.deadline) > new Date() &&
            p.discountprice > 1
        );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCT_PER_PAGE);

  const { data: wish, isLoading, isError } = useWishQuery();

  // 상태를 관리하기 위한 useState 훅. 초기값은 빈 배열로 설정.
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    if (wish) {
      setLikedProducts(wish.map((item) => item.productPostId));
    }
  }, [wish]);

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

  // 선택된 탭이 변경되면 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedText]);

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCT_PER_PAGE
  );

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Recommend>
        <ProductHeader>
          <TextWrapper>
            <TabText
              selected={selectedText === '판매 상품'}
              onClick={() => setSelectedText('판매 상품')}
            >
              판매 상품
            </TabText>
            <TabText
              selected={selectedText === '기한 마감 상품'}
              onClick={() => setSelectedText('기한 마감 상품')}
            >
              기한 마감 상품
            </TabText>
          </TextWrapper>
          {input && <SearchTitle>{input}에 대한 검색 결과</SearchTitle>}
        </ProductHeader>

        <ProductCardWrapper>
          {currentProducts.length === 0 ? (
            <NoProductMessage>
              {selectedText === '판매 상품'
                ? '현재 판매 상품이 없습니다.'
                : '현재 기한 마감 상품이 없습니다.'}
            </NoProductMessage>
          ) : (
            currentProducts.map((product) => (
              <ProductCard
                key={product.productPostId}
                $isAvailable={selectedText === '판매 상품'}
              >
                <StyledLink to={`/products/${product.productPostId}`}>
                  <ProductImg
                    src={product.url || DEFAULT_IMG}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMG;
                    }}
                  />
                  <ProductWrapper>
                    <ProductName>{product.name}</ProductName>
                    <ProductStar>
                      <StarRating rating={product.rating} />
                    </ProductStar>
                    <PriceWrapper>
                      {product.available ? (
                        <>
                          <OriginalPrice>
                            {product.originalprice}원
                          </OriginalPrice>
                          <DiscountedPrice>
                            {product.discountprice}원
                          </DiscountedPrice>
                        </>
                      ) : (
                        <UnavailablePrice>∞ (판매 종료)</UnavailablePrice>
                      )}
                    </PriceWrapper>
                  </ProductWrapper>
                </StyledLink>
                <LikeButton
                  $likes={likedProducts.includes(product.productPostId)}
                  onClick={() => {
                    changeLike(product.productPostId);
                  }}
                >
                  {likedProducts.includes(product.productPostId) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </LikeButton>
              </ProductCard>
            ))
          )}
        </ProductCardWrapper>

        {totalPages > 1 && (
          <PagenationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </PagenationWrapper>
        )}
      </Recommend>
    </QueryHandler>
  );
};

// Additional styled components specific to ProductComponent
const ProductHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 15px;
`;

const TabText = styled.h2<{ selected: boolean }>`
  cursor: pointer;
  font-size: 16px;
  margin: 0;
  color: ${({ selected }) => (selected ? '#333' : '#666')};
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};

  &:hover {
    color: #333;
  }
`;

const SearchTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
`;

const NoProductMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: gray;
  margin: 50px 0;
`;

const ProductCardWrapper = styled(CardWrapper)`
  margin-top: 20px;
`;

const ProductCard = styled(Card)<{ $isAvailable: boolean }>`
  background-color: ${({ $isAvailable }) =>
    $isAvailable ? 'white' : '#f5f5f5'};
  opacity: ${({ $isAvailable }) => ($isAvailable ? 1 : 0.8)};

  &::after {
    content: ${({ $isAvailable }) => ($isAvailable ? '""' : '"판매 종료"')};
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #474545;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: ${({ $isAvailable }) =>
      $isAvailable ? 'transparent' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const UnavailablePrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #999;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const PagenationWrapper = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LikeButton = styled.button<{ $likes: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
  }

  svg {
    color: ${({ $likes }) => ($likes ? '#ff4d4f' : '#999')};
    font-size: 20px;
  }
`;

export default ProductComponent;
