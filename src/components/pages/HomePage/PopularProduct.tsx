import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PopularProductProps {
  product: {
    id: number;
    image: string;
    stars: number;
  };
}

const PopularProduct: React.FC<PopularProductProps> = ({ product }) => {
  return (
    <Popular>
      <Link to={`/products/${product.id}`}>
        <PopularImg src={product.image} alt="상단 인기 상품" />
        <PopularStar>{'⭐'.repeat(product.stars)}</PopularStar>
      </Link>
    </Popular>
  );
};

const Popular = styled.div`
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
