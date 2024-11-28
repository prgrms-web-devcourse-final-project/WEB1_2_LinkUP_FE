import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductbyId } from '../components/pages/ProductDetailPage/api/productDetailApi';
import { getProducts } from '../components/pages/HomePage/api/productApi';

// 제품 ID로 제품 정보를 가져오는 훅
export const useProductQuery = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductbyId(id),
  });
};

// 모든 제품을 가져오는 훅
export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

//로딩과 에러 처리
export const QueryHandler = ({
  isLoading,
  isError,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>잠시 후 다시 시도해주세요.</div>;
  return <>{children}</>;
};
