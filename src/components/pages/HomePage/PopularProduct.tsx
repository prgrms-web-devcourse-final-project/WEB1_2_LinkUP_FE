import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../../common/StarRating';
import { Product } from './model/productSchema';

interface PopularProductProps {
  product: Product;
}

const PopularProduct: React.FC<PopularProductProps> = ({ product }) => {
  return (
    <Popular>
      <Link to={`/products/${product.id}`}>
        <PopularImg src={product.image} alt="상단 인기 상품" />
        <PopularStar>
          <StarRating rating={product.stars} />
        </PopularStar>
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
