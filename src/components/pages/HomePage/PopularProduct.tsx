import React from 'react';
import styled from 'styled-components';
import StarRating from '../../common/StarRating';
import { QueryHandler, useProductQuery } from '../../../hooks/useGetProduct';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';

interface PopularProductProps {
  productId: number | undefined;
  category: string | undefined;
}
const PopularProduct: React.FC<PopularProductProps> = ({
  productId,
  category,
}) => {
  if (!productId) {
    return <div>No popular product available</div>;
  }

  const { data: product, isLoading, isError } = useProductQuery(productId);
  if (!product) {
    return <div>Product data is not available</div>;
  }
  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <BannerWrapper>
          <BannerContainer>
            <ImageWrapper>
              <ProductImage
                src={product.url || DEFAULT_IMG}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMG;
                }}
              />
            </ImageWrapper>
            <ProductInfoSection>
              <Star>
                <StarRating rating={product.rating} />
              </Star>
              <ProductHeader>
                <TitleArea>
                  <ProductName>{product.name}</ProductName>
                  <ProductCategory>{category}</ProductCategory>
                </TitleArea>
                <ProductDescription>{product.description}</ProductDescription>
              </ProductHeader>
            </ProductInfoSection>
          </BannerContainer>
        </BannerWrapper>
      </QueryHandler>
    </>
  );
};

const BannerWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: block;
`;

const BannerContainer = styled.div`
  height: 300px;
  width: 1100px;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 750px;
    height: 300px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 550px;
    height: 200px;
  }
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 200px;
    height: 200px;
  }
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
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 15px;
    top: 10px;
  }
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
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const ProductName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-right: 15px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 19px;
  }
`;

const ProductCategory = styled.p`
  font-size: 16px;
  color: #666;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: -10px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
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
  @media (min-width: 768px) and (max-width: 1024px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
`;
export default PopularProduct;
