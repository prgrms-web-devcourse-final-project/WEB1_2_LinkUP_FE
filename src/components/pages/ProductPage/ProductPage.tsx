import React, { useEffect, useState } from 'react';
import InputComponent from '../ProductPage/InputComponent';
import ProductComponent from '../ProductPage/ProductComponent';
import { useLocation } from 'react-router-dom';
import { AllProducts } from '../HomePage/model/productSchema';
import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { ContainerBox, Container } from '../HomePage/style/CardStyle';

type CategoryType = 'ALL' | 'LIFESTYLE' | 'FOOD' | 'FASHION';

const isValidCategory = (category: string): category is CategoryType => {
  return ['ALL', 'LIFESTYLE', 'FOOD', 'FASHION'].includes(category);
};

const ProductPage: React.FC = () => {
  const { data: products, isLoading, isError } = useProductsQuery();
  const [input, setInput] = useState('');
  const [initialCategory, setInitialCategory] = useState<CategoryType>('ALL');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      const upperCategory = category.toUpperCase();
      if (isValidCategory(upperCategory)) {
        setInitialCategory(upperCategory);
      } else {
        setInitialCategory('ALL');
      }
    } else {
      setInitialCategory('ALL');
    }
  }, [location.search]);

  const filtered =
    products?.filter(
      (product: AllProducts) =>
        product.name.toLowerCase().includes(input.toLowerCase()) ||
        product.category.toLowerCase().includes(input.toLowerCase())
    ) || [];

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <ContainerBox>
        <Container>
          <InputComponent input={input} setInput={setInput} />
        </Container>
      </ContainerBox>
      <ContainerBox>
        <Container>
          <ProductComponent
            input={input}
            products={filtered}
            initialCategory={initialCategory}
          />
        </Container>
      </ContainerBox>
      <ScrollToTopButton />
    </QueryHandler>
  );
};

export default ProductPage;
