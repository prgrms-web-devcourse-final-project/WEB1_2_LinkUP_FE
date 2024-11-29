import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../common/Pagination';
import StarRating from '../../common/StarRating';
import Heart from '../../../assets/icons/heart.png';
import FilledHeart from '../../../assets/icons/filled-heart.png';
import { Product } from '../HomePage/model/productSchema';

type ProductComponentProps = {
  input: string;
  products: Product[];
};

const ProductComponent: React.FC<ProductComponentProps> = ({
  input,
  products,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState<'판매 상품' | '마감 상품'>(
    '판매 상품'
  );
  const PRODUCT_PER_PAGE = 16;

  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const filteredProducts =
    selectedText === '마감 상품'
      ? products.filter((product) => new Date(product.deadline) < new Date())
      : products;

  const totalPages = Math.ceil(filteredProducts.length / PRODUCT_PER_PAGE);

  // 선택된 탭이 변경되면 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedText]);
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCT_PER_PAGE
  );

  return (
    <Recommend>
      <RecommendTitle>
        <TextWrapper>
          <Text
            isSelected={selectedText === '판매 상품'}
            onClick={() => setSelectedText('판매 상품')}
          >
            판매 상품
          </Text>
          <Text
            isSelected={selectedText === '마감 상품'}
            onClick={() => setSelectedText('마감 상품')}
          >
            마감 상품
          </Text>
        </TextWrapper>
        {input ? `${input}에 대한 검색 결과` : ''}
      </RecommendTitle>

      <CardWrapper>
        {currentProducts.map((product) => (
          <Card key={product.id} isSelected={selectedText === '판매 상품'}>
            <StyledLink to={`/products/${product.id}`}>
              <ProductImg src={product.url} alt={product.name} />
              <ProductWrapper>
                <ProductName>{product.name}</ProductName>
                <ProductStar>
                  {' '}
                  <StarRating rating={product.rating} />
                </ProductStar>
                <PriceWrapper>
                  <OriginalPrice>
                    ${product.originalPrice.toFixed(2)}
                  </OriginalPrice>
                  <DiscountedPrice>
                    ${product.discountPrice.toFixed(2)}
                  </DiscountedPrice>
                </PriceWrapper>
              </ProductWrapper>
            </StyledLink>
            <LikeButton likes={product.likes} />
          </Card>
        ))}
      </CardWrapper>
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
  );
};

const Recommend = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`;

const RecommendTitle = styled.h2`
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const TextWrapper = styled.div`
  width: 200px;
  display: flex;
  gap: 25px;
  margin-top: -15%;
  margin-bottom: 5%;
`;
const Text = styled.h2<{ isSelected: boolean }>`
  cursor: pointer;
  text-decoration: ${({ isSelected }) => (isSelected ? 'underline' : 'none')};
  font-size: 16px;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 10px;
  width: 200px;
  background-color: ${({ isSelected }) => (isSelected ? 'white' : '#f0f0f0')};

  border-radius: 8px;
  box-shadow: ${({ isSelected }) =>
    isSelected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.6)};
  align-items: center;
  position: relative;
  &::after {
    content: ${({ isSelected }) => (isSelected ? '""' : '"판매 종료"')};
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 130px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 80px;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
`;
const ProductImg = styled.img`
  width: 90%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  object-fit: cover;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`;

const ProductStar = styled.div`
  font-size: 20px;
  color: #ffaa00;
  text-align: left;
  margin-left: -5px;
  margin-top: 5px;
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  text-align: left;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 10px;
    position: absolute;
    bottom: 25px;
  }
`;

const DiscountedPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }
`;

const LikeButton = styled.img<{ likes: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  content: ${({ likes }) => `url(${likes ? FilledHeart : Heart})`};
  color: ${({ likes }) => (likes ? 'red ' : 'transparent')};

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    bottom: 10px;
    right: 10px;
    width: 18px;
    height: 18px;
  }
`;
const PagenationWrapper = styled.div`
  margin-top: 20px;
  margin-left: 46%;
`;
export default ProductComponent;
