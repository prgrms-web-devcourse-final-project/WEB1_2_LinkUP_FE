import React from 'react';
import styled from 'styled-components';
import { Product } from './model/productSchema';
import StarRating from '../../common/StarRating';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

interface PopularProductProps {
  product: Product;
}

const PopularProduct: React.FC<PopularProductProps> = ({ product }) => {
  return (
    <StyledLink to={`/products/${product.id}`}>
      <BannerContainer>
        <ImageWrapper>
          <ProductImage src={product.image} alt={product.name} />
        </ImageWrapper>
        <ProductInfoSection>
          <Star>
            <StarRating rating={product.stars} />
          </Star>
          <ProductHeader>
            <TitleArea>
              <ProductName>{product.name}</ProductName>

              <ProductCategory>{product.category}</ProductCategory>
            </TitleArea>
            <ProductDescription> 상품설명- 추후 추가 예정</ProductDescription>
            {/* {product.description} */}
          </ProductHeader>
        </ProductInfoSection>
      </BannerContainer>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 80%;
  margin: 0 auto;
  display: block;
  text-decoration: none;
  color: inherit;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`;

const BannerContainer = styled.div`
  height: 300px;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ProductImage = styled.img`
  height: 300px;
  width: auto;
  object-fit: contain;
`;

const ProductInfoSection = styled.div`
  background: linear-gradient(to top, rgba(155, 155, 155, 0.7), transparent);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  background-color: #f5f5f5;
  position: relative;
`;
const Star = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
`;
const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 15px;
`;

const ProductName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-right: 15px;
`;

const ProductCategory = styled.p`
  font-size: 16px;
  color: #666;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default PopularProduct;
