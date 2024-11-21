import React from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  name: string;
  stars: number;
  originalPrice: number;
  discountedPrice: number;
  image: string;
}

interface PopularProductsListProps {
  products: Product[];
}

const RecommendProduct: React.FC<PopularProductsListProps> = ({ products }) => (
  <Recommend>
    <RecommendTitle>
      실시간 인기 상품(전체 물건에서 댓글많이 달린 순)
    </RecommendTitle>
    <CardWrapper>
      {products.map((product) => (
        <Card key={product.id}>
          <ProductImg src={product.image} alt={product.name} />
          <ProductWrapper>
            <ProductName>{product.name}</ProductName>
            <ProductStar>{'⭐'.repeat(product.stars)}</ProductStar>
            <PriceWrapper>
              <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
              <DiscountedPrice>
                ${product.discountedPrice.toFixed(2)}
              </DiscountedPrice>
            </PriceWrapper>
          </ProductWrapper>
          <LikeButton>♡</LikeButton>
        </Card>
      ))}
    </CardWrapper>
  </Recommend>
);

const Recommend = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
  background-color: gray;
`;

const RecommendTitle = styled.h2`
  text-decoration: underline;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  right: 40px;
  font-size: 25px;
  color: #ccc;
  cursor: pointer;
`;

export default RecommendProduct;
