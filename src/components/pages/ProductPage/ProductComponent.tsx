import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../common/Pagination';
import StarRating from '../../common/StarRating';
interface Product {
  id: string;
  name: string;
  stars: number;
  originalPrice: number;
  discountedPrice: number;
  image: string;
}

type ProductComponentProps = {
  input: string;
  products: Product[];
};

const ProductComponent: React.FC<ProductComponentProps> = ({
  input,
  products,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCT_PER_PAGE = 16;
  const totalPages = Math.ceil(products.length / PRODUCT_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCT_PER_PAGE
  );
  return (
    <Recommend>
      <RecommendTitle>
        {' '}
        {input ? `${input}에 대한 검색 결과` : ''}
      </RecommendTitle>

      <CardWrapper>
        {currentProducts.map((product) => (
          <Card key={product.id}>
            <StyledLink to={`/products/${product.id}`}>
              <ProductImg src={product.image} alt={product.name} />
              <ProductWrapper>
                <ProductName>{product.name}</ProductName>
                <ProductStar>
                  {' '}
                  <StarRating rating={product.stars} />
                </ProductStar>
                <PriceWrapper>
                  <OriginalPrice>
                    ${product.originalPrice.toFixed(2)}
                  </OriginalPrice>
                  <DiscountedPrice>
                    ${product.discountedPrice.toFixed(2)}
                  </DiscountedPrice>
                </PriceWrapper>
              </ProductWrapper>
            </StyledLink>
            <LikeButton>♡</LikeButton>
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

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 10px;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  position: relative;
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
`;

const ProductStar = styled.div`
  font-size: 20px;
  color: #ffaa00;
  text-align: left;
  margin-left: -5px;
  margin-top: 5px;
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
`;

const DiscountedPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
`;

const LikeButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 25px;
  color: #ccc;
  cursor: pointer;
`;

const PagenationWrapper = styled.div`
  margin-top: 20px;
  margin-left: 46%;
`;
export default ProductComponent;
