import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface DepositPageProps {
  bankCode: string;
  accountNumber: string;
  totalAmount: number;
  communityPostId: number;
  onConfirm: (inputAmount: number) => void;
}

// 은행 코드와 이름 매핑
const bankCodeToName = (code: string): string => {
  const bankMap: { [key: string]: string } = {
    '004': 'KB국민은행',
    '045': 'MG새마을금고',
    '034': '광주은행',
    '011': 'NH농협은행',
    '003': 'IBK기업은행',
    '088': '신한은행',
    '020': '우리은행',
    '007': '수협은행',
  };
  return bankMap[code] || '알 수 없는 은행';
};

const DepositPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as DepositPageProps;

  if (!state) {
    return <div>잘못된 접근입니다.</div>;
  }

  const { bankCode, accountNumber, totalAmount, onConfirm, communityPostId } =
    state;

  const [bankName, setBankName] = useState<string>('');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setBankName(bankCodeToName(bankCode)); // 은행 코드로 이름 설정
  }, [bankCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
    setErrorMessage(''); // 입력 변경 시 오류 초기화
  };

  const handleConfirm = () => {
    const amount = Number(inputAmount);
    if (amount !== totalAmount) {
      setErrorMessage(
        `입금 금액이 정확하지 않습니다. 총 금액: ${totalAmount.toLocaleString()} 원`
      );
      return;
    }
    onConfirm(amount);

    // PaymentCompletePage로 이동
    navigate(`/community/post/${communityPostId}/payment/complete`, {
      state: { communityPostId },
    });
  };

  return (
    <Container>
      <Content>
        <Title>입금 정보 확인</Title>
        <InfoContainer>
          <InfoRow>
            <Label>은행명:</Label>
            <Value>{bankName}</Value>
          </InfoRow>
          <InfoRow>
            <Label>계좌 번호:</Label>
            <Value>{accountNumber}</Value>
          </InfoRow>
          <InfoRow>
            <Label>결제 금액:</Label>
            <Value>{totalAmount.toLocaleString()} 원</Value>
          </InfoRow>
        </InfoContainer>
        <InputContainer>
          <Input
            type="number"
            placeholder="입금 금액을 입력하세요"
            value={inputAmount}
            onChange={handleInputChange}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputContainer>
        <ButtonContainer>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default DepositPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Content = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Value = styled.span`
  color: #555;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
