import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { handleCommunityPayment } from './api/paymentApi';
import { QueryHandler } from '../../../hooks/useGetProduct';
import { useQuantity } from '../../../context/QuantityContext';
import { usePostQuery } from '../../../hooks/useGetPost';

const ParticipantsForm = () => {
  const { quantity } = useQuantity();
  const { id } = useParams();
  const [payment, setPayment] = useState('');

  const postId = useMemo(() => {
    if (!id || isNaN(Number(id))) {
      return null;
    }
    return Number(id);
  }, [id]);

  if (!postId) {
    return <p>잘못된 상품 ID입니다.</p>;
  }
  const { data: post, isLoading, isError } = usePostQuery(postId);

  if (!post) {
    return <p>해당 상품을 찾을 수 없습니다.</p>;
  }

  const validateForm = () => {
    if (!payment) {
      alert('결제 방법을 선택해주세요.');
      return false;
    }
    return true;
  };

  const payload = {
    recipientName: '대표자 배송',
    recipientAddress: '대표자 배송',
    deliveryRequest: '대표자 배송',
  };
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value);
  };
  const onPaymentSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const paymentResult = await handleCommunityPayment(postId, payload);
      window.location.href = paymentResult;
    } catch (e) {
      alert(`결제에 실패하였습니다 ${e}`);
    }
  };

  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <Container>
          <Section>
            <Title>공구 모집 상품 정보</Title>
            <ContentBox>
              <FlexRow>
                <ProductName>{post?.communityPost.title}</ProductName>
                <Price>개당 가격 : {post?.communityPost.unitAmount}원</Price>
              </FlexRow>
              <FlexRow>
                <Quantity>수량 : {quantity}</Quantity>
              </FlexRow>
              <TotalRow>
                <span>합계:</span>
                <TotalPrice>
                  {post?.communityPost?.unitAmount ?? 0 * quantity}원
                </TotalPrice>
              </TotalRow>
            </ContentBox>
          </Section>

          <Section>
            <Title>결제 정보 확인</Title>
            <ContentBox>
              <RadioGroup>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="payment-method"
                    value="가상계좌좌"
                    onChange={handleRadio}
                  />
                  <RadioText>가상계좌 입금</RadioText>
                </RadioLabel>
              </RadioGroup>
            </ContentBox>
          </Section>

          <ButtonGroup>
            <PayButton
              onClick={() => {
                onPaymentSubmit();
              }}
            >
              결제하기
            </PayButton>
            <BackButton to={`/community/post/${postId}`}>뒤로 가기</BackButton>
          </ButtonGroup>
        </Container>
      </QueryHandler>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
`;

const Section = styled.div`
  margin-bottom: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ContentBox = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TotalRow = styled(FlexRow)`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  font-weight: 600;
  color: #1e293b;
`;

const ProductName = styled.span`
  font-weight: 500;
  color: #1e293b;
`;

const Price = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

const TotalPrice = styled.span`
  color: #2563eb;
  font-weight: 600;
  font-size: 1.125rem;
`;

const Quantity = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;

  &:checked {
    accent-color: #2563eb;
  }
`;

const RadioText = styled.span`
  margin-left: 8px;
  color: #1e293b;
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
`;

const BackButton = styled(Link)`
  text-decoration: none; /* 링크의 기본 밑줄 제거 */
  display: flex; /* 버튼 스타일 유지 */
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #f8fafc;
  }
`;

const PayButton = styled(Button)`
  background-color: #2563eb;
  border: none;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #1d4ed8;
  }
`;

export default ParticipantsForm;
