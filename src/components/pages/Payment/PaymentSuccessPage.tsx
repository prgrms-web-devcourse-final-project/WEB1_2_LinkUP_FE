// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Link,
  //  useParams
} from 'react-router-dom';
import styled from 'styled-components';
// import { getProductbyId } from '../ProductDetailPage/api/productDetailApi';
// import { Product } from './api/paymentApi';

const PaymentSuccessPage = () => {
  const product = {
    id: '1',
    name: '다이슨 드라이기',
    discountedPrice: 79.98,
  };
  //   const { id } = useParams();
  //   if (!id) {
  //     return <p>제품 번호가 유실되었습니다.</p>;
  //   }
  //   const {
  //     data: product,
  //     isLoading,
  //     isError,
  //   } = useQuery<Product, Error>({
  //     queryKey: ['product', id],
  //     queryFn: () => getProductbyId(id),
  //   });
  //   // 로딩 상태 처리
  //   if (isLoading) {
  //     return (
  //       <Container>
  //         <SuccessSection>
  //           <Title>주문 정보 로딩 중...</Title>
  //         </SuccessSection>
  //       </Container>
  //     );
  //   }

  //   // 에러 상태 처리
  //   if (isError) {
  //     return (
  //       <Container>
  //         <SuccessSection>
  //           <Title>주문 정보를 불러오지 못했습니다.</Title>
  //           <Subtitle>잠시 후 다시 시도해주세요.</Subtitle>
  //         </SuccessSection>
  //       </Container>
  //     );
  //   }
  return (
    <Container>
      <SuccessSection>
        <Title>결제 완료</Title>
        <Subtitle>주문해주셔서 감사합니다!</Subtitle>

        <OrderSummary>
          <SummaryRow>
            <Label>상품명</Label>
            <Value>{product?.name}</Value>
          </SummaryRow>
          <SummaryRow>
            <Label>결제 금액</Label>
            <Value>₩{product?.discountedPrice.toLocaleString()}</Value>
          </SummaryRow>
        </OrderSummary>
      </SuccessSection>

      <ButtonGroup>
        <OrderDetailButton to={`/orders/${product?.id}`}>
          주문 내역 보기
        </OrderDetailButton>
        <BackButton to="/">메인으로 돌아가기</BackButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessSection = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 32px 20px;
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 24px;
`;

const OrderSummary = styled.div`
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const Value = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const BaseButton = styled(Link)`
  flex: 1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
`;

const OrderDetailButton = styled(BaseButton)`
  background-color: #2563eb;
  border: none;
  color: white;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const BackButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;

  &:hover {
    background-color: #f8fafc;
  }
`;

export default PaymentSuccessPage;