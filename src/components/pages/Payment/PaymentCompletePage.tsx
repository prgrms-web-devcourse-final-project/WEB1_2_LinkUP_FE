import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuantity } from '../../../context/QuantityContext';
import { usePostQuery } from '../../../hooks/useGetPost';
import { QueryHandler } from '../../../hooks/useGetProduct';

const PaymentCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const { getQuantity } = useQuantity();
  const { id } = useParams();
  if (!id) {
    return <p>상품 번호가 유실되었습니다.</p>;
  }
  const postId = Number(id);
  const userId = localStorage.getItem('userid');
  const quantity = getQuantity(userId!, id);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const price = urlParams.get('amount');
  const accountNumber = urlParams.get('accountNumber');
  const bankId = urlParams.get('bankId');
  const { data: post, isLoading, isError } = usePostQuery(postId);

  const bankCodeToName = (code: string): string => {
    const bankMap: { [key: string]: string } = {
      '04': 'KB국민은행',
      '06': 'KB국민은행',
      '45': 'MG새마을금고',
      '34': '광주은행',
      '11': 'NH농협은행',
      '03': 'IBK기업은행',
      '88': '신한은행',
      '20': '우리은행',
      '07': '수협은행',
    };
    return bankMap[code];
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Container>
        <SuccessSection>
          <Title>입금 확인 대기중</Title>
          <Subtitle>입금이 확인되면 주문이 완료됩니다.</Subtitle>

          <OrderSummary>
            <SummaryRow>
              <Label>상품명</Label>
              <Value>{post?.communityPost.title}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>수량</Label>
              <Value>{quantity}개</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>결제 금액</Label>
              <Value>{price}원</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>가상 계좌번호</Label>
              <Value>
                {bankId ? bankCodeToName(bankId) : ''} {accountNumber}
              </Value>
            </SummaryRow>
          </OrderSummary>
        </SuccessSection>

        <ButtonGroup>
          <OrderDetailButton onClick={() => navigate('/community/post')}>
            다른 상품 보기
          </OrderDetailButton>
          <BackButton onClick={() => navigate('/mypage/orderlist')}>
            주문내역 보기
          </BackButton>
        </ButtonGroup>
      </Container>
    </QueryHandler>
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

const BaseButton = styled.button`
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

export default PaymentCompletePage;
