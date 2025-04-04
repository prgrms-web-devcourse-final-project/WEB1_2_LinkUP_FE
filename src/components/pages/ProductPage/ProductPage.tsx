import React, { useEffect, useMemo, useState } from 'react';
import InputComponent from '../ProductPage/InputComponent';
import ProductComponent from '../ProductPage/ProductComponent';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { AllProducts } from '../HomePage/model/productSchema';
import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';

const ProductPage = () => {
  const { data: products, isLoading, isError } = useProductsQuery();
  const [input, setInput] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setInput(category);
    }
  }, []);

  const getTopProducts = (products: AllProducts[]): AllProducts[] => {
    // 마감임박순서
    const sortedByDeadline = [...products].sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
    return sortedByDeadline;
  };

  const displayedProducts = useMemo(() => {
    return products ? getTopProducts(products) : [];
  }, [products]);

  const filtered = displayedProducts.filter(
    (product: AllProducts) =>
      product.name.toLowerCase().includes(input.toLowerCase()) ||
      product.category.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <ContainerBox>
          <Container>
            <InputComponent input={input} setInput={setInput} />
          </Container>
        </ContainerBox>
        <ContainerBox>
          <Container>
            <ProductComponent input={input} products={filtered} />
          </Container>
          <ScrollToTopButton />
        </ContainerBox>
      </QueryHandler>
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
