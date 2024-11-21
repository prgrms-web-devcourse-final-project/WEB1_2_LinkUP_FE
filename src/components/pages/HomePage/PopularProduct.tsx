import React from 'react';
import styled from 'styled-components';

interface PopularProductProps {
  product: {
    image: string;
    stars: number;
  };
}

const PopularProduct: React.FC<PopularProductProps> = ({ product }) => (
  <Popular>
    <PopularImg src={product.image} alt="상단 인기 상품" />
    <PopularStar>{'⭐'.repeat(product.stars)}</PopularStar>
  </Popular>
);

const Popular = styled.div`
  background-color: gray;
  width: 80%;
  height: 250px;
  align-items: center;
  margin: 0 auto;
  position: relative;
`;

const PopularImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PopularStar = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 35px;
`;

export default PopularProduct;
