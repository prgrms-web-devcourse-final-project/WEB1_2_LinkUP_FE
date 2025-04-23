import React, { useEffect, useMemo, useState } from 'react';
import InputComponent from '../ProductPage/InputComponent';
import ProductComponent from '../ProductPage/ProductComponent';
import { useLocation } from 'react-router-dom';
import { AllProducts } from '../HomePage/model/productSchema';
import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { ContainerBox, Container } from '../HomePage/style/CardStyle';

const ProductPage: React.FC = () => {
  const { data: products, isLoading, isError } = useProductsQuery();
  const [input, setInput] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setInput(category);
    }
  }, [location.search]);

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
      </ContainerBox>
      <ScrollToTopButton />
    </QueryHandler>
  );
};

export default ProductPage;
