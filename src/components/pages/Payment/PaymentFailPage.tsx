import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { QueryHandler, useProductQuery } from '../../../hooks/useGetProduct';
import { products } from '../../../mocks/products';

const PaymentFailPage = () => {
  const { id } = useParams();
  if (!id) {
    return <p>상품 번호가 유실되었습니다.</p>;
  }
  const productId = Number(id);
  // const { data: product, isLoading, isError } = useProductQuery(productId);
  const product = products.filter((p) => p.id === productId)[0];
  console.log(product);
  if (!product) {
    return <p>해당 상품을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      {/* <QueryHandler isLoading={isLoading} isError={isError}> */}
      <Container>
        <FailureSection>
          <Title>결제 실패</Title>
          <Subtitle>죄송합니다. 결제에 실패하였습니다.</Subtitle>

          <OrderSummary>
            <SummaryRow>
              <Label>상품명</Label>
              <Value>{product?.name}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>결제 금액</Label>
              <Value>{product?.discountprice} 원</Value>
            </SummaryRow>
          </OrderSummary>
        </FailureSection>

        <ButtonGroup>
          <RetryButton to={`/products/${productId}`}>다시 시도하기</RetryButton>
          <BackButton to="/">메인으로 돌아가기</BackButton>
        </ButtonGroup>
      </Container>
      {/* </QueryHandler> */}
    </>
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

const FailureSection = styled.div`
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

const RetryButton = styled(BaseButton)`
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

export default PaymentFailPage;