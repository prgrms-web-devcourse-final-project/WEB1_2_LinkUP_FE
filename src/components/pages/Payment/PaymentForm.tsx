import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { handlePayment } from './api/paymentApi';

const PaymentForm = () => {
  const product = {
    id: '1',
    name: '다이슨 드라이기',
    stars: 5,
    minimum: 5,
    now: 3,
    stock: 10,
    originalPrice: 95.5,
    discountedPrice: 79.98,
    image: 'https://via.placeholder.com/200',
  };

  return (
    <Container>
      <Section>
        <Title>주문 상품 정보</Title>
        <ContentBox>
          <FlexRow>
            <ProductName>{product.name || '상품명 불러오는 중...'}</ProductName>
            <Price>₩{product.discountedPrice.toLocaleString()}</Price>
          </FlexRow>
          <FlexRow>
            <Quantity>수량: 1개</Quantity>
          </FlexRow>
          <TotalRow>
            <span>합계:</span>
            <TotalPrice>₩{product.discountedPrice.toLocaleString()}</TotalPrice>
          </TotalRow>
        </ContentBox>
      </Section>

      <Section>
        <Title>배송 정보 확인</Title>
        <ContentBox>
          <FormGroup>
            <Label>
              이름
              <Input type="text" placeholder="이름 입력" />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              주소(주소지 근처의 픽업장소 선택)
              <Input type="text" placeholder="주소 입력" />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              배송 시 요청사항
              <TextArea rows={2} placeholder="요청사항 입력" />
            </Label>
          </FormGroup>
        </ContentBox>
      </Section>

      <Section>
        <Title>결제 정보 확인</Title>
        <ContentBox>
          <RadioGroup>
            <RadioLabel>
              <RadioInput type="radio" name="payment-method" />
              <RadioText>가상계좌 입금</RadioText>
            </RadioLabel>
            <RadioLabel>
              <RadioInput type="radio" name="payment-method" />
              <RadioText>카드 결제</RadioText>
            </RadioLabel>
          </RadioGroup>
        </ContentBox>
      </Section>

      <ButtonGroup>
        <PayButton
          onClick={() => {
            handlePayment();
          }}
        >
          결제하기
        </PayButton>
        <BackButton to={`/products/${product.id}`}>뒤로 가기</BackButton>
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

const FormGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  color: #475569;
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-top: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  margin-top: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
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

export default PaymentForm;
