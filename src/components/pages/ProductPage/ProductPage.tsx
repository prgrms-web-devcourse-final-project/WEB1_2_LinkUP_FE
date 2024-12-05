import React, { useEffect, useMemo, useState } from 'react';
import InputComponent from '../ProductPage/InputComponent';
import ProductComponent from '../ProductPage/ProductComponent';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Product } from '../HomePage/model/productSchema';
import { products } from '../../../mocks/products';

const ProductPage = () => {
  const [input, setInput] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setInput(category);
    }
  }, []);

  const getTopProducts = (products: Product[]): Product[] => {
    const sortedByreviews = [...products].sort(
      (a, b) => b.reviews.length - a.reviews.length
    );
    return sortedByreviews;
  };

  const displayedProducts = useMemo(() => getTopProducts(products), [products]);

  const filtered = displayedProducts.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(input.toLowerCase()) ||
      product.category.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <>
      <ContainerBox>
        <Container>
          <InputComponent input={input} setInput={setInput} />
        </Container>
      </ContainerBox>
      <ContainerBox>
        <Container>
          <ProductComponent input={input} products={filtered} />
        </Container>
      </ContainerBox>
    </>
  );
};
const ContainerBox = styled.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export default ProductPage;
