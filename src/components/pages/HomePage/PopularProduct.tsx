import React from 'react';
import StarRating from '../../common/StarRating';
import { QueryHandler, useProductQuery } from '../../../hooks/useGetProduct';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import {
  BannerWrapper,
  BannerContainer,
  BannerImageWrapper,
  BannerImage,
  BannerInfoSection,
  BannerStar,
  BannerHeader,
  BannerTitleArea,
  BannerProductName,
  BannerProductCategory,
  BannerDescription,
} from './style/CardStyle';

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
    <QueryHandler isLoading={isLoading} isError={isError}>
      <BannerWrapper>
        <BannerContainer>
          <BannerImageWrapper>
            <BannerImage
              src={product.url || DEFAULT_IMG}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMG;
              }}
            />
          </BannerImageWrapper>
          <BannerInfoSection>
            <BannerStar>
              <StarRating rating={product.rating} />
            </BannerStar>
            <BannerHeader>
              <BannerTitleArea>
                <BannerProductName>{product.name}</BannerProductName>
                <BannerProductCategory>{category}</BannerProductCategory>
              </BannerTitleArea>
              <BannerDescription>{product.description}</BannerDescription>
            </BannerHeader>
          </BannerInfoSection>
        </BannerContainer>
      </BannerWrapper>
    </QueryHandler>
  );
};

export default PopularProduct;
