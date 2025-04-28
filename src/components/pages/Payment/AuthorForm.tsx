import React, { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { handleCommunityPayment } from './api/paymentApi';
import { QueryHandler } from '../../../hooks/useGetProduct';
import { usePostQuery } from '../../../hooks/useGetPost';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const AuthorForm = () => {
  const { id } = useParams();
  const postcodeScriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const postId = useMemo(() => {
    if (!id || isNaN(Number(id))) {
      return null;
    }
    return Number(id);
  }, [id]);

  if (!postId) {
    return <p>잘못된 게시글 ID입니다.</p>;
  }

  const { data: post, isLoading, isError } = usePostQuery(postId);
  if (!post) {
    return <p>해당 게시글을 찾을 수 없습니다.</p>;
  }
  const location = useLocation();
  const quantity = typeof location.state === 'number' ? location.state : 1;

  const [userName, setName] = useState('');
  const [basicAddress, setBasicAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [needed, setNeeded] = useState('');
  const [payment, setPayment] = useState('');

  // 주소 검색 팝업 실행
  const handleAddressSearch = () => {
    open({
      onComplete: (data) => {
        setBasicAddress(data.address);
      },
    });
  };

  const validateForm = () => {
    if (!userName.trim()) {
      alert('수령인을 입력해주세요.');
      return false;
    }
    if (!basicAddress.trim()) {
      alert('주소를 입력해주세요.');
      return false;
    }
    if (!detailAddress.trim()) {
      alert('상세 주소를 입력해주세요.');
      return false;
    }
    if (!payment) {
      alert('결제 방법을 선택해주세요.');
      return false;
    }
    return true;
  };

  const payload = {
    recipientName: userName,
    recipientAddress: `${basicAddress} ${detailAddress}`,
    deliveryRequest: needed,
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
                <ProductName>{post.communityPost.title}</ProductName>
                <Price>{post.communityPost.unitAmount}원</Price>
              </FlexRow>
              <FlexRow>
                <Quantity>수량 : {quantity}</Quantity>
              </FlexRow>
              <TotalRow>
                <span>합계:</span>
                <TotalPrice>
                  {post.communityPost.unitAmount * quantity}원
                </TotalPrice>
              </TotalRow>
            </ContentBox>
          </Section>

          <Section>
            <Title>배송 정보 확인</Title>
            <ContentBox>
              <FormGroup>
                <Label>
                  수령인
                  <InputWrapper>
                    <Input
                      type="text"
                      placeholder="이름 입력"
                      value={userName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputWrapper>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label>배송지</Label>
                <InputWrapper>
                  <BasicAddressInput
                    type="text"
                    placeholder="기본 주소를 선택해주세요"
                    value={basicAddress}
                    readOnly
                    onClick={handleAddressSearch} // 클릭 시 주소 검색 팝업 실행
                  />
                </InputWrapper>
                <InputWrapper>
                  <DetailAddressInput
                    type="text"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>
                  배송 시 요청사항 (선택)
                  <InputWrapper>
                    <TextArea
                      rows={2}
                      placeholder="요청사항을 입력해주세요 (선택사항)"
                      value={needed}
                      onChange={(e) => setNeeded(e.target.value)}
                    />
                  </InputWrapper>
                </Label>
              </FormGroup>
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
                    value="카드"
                    onChange={handleRadio}
                  />
                  <RadioText>가상계좌 입금</RadioText>
                </RadioLabel>
              </RadioGroup>
            </ContentBox>
          </Section>

          <ButtonGroup>
            <PayButton onClick={onPaymentSubmit}>결제하기</PayButton>
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
const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const BasicAddressInput = styled(Input)`
  flex-grow: 1;
  cursor: pointer;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
  position: relative;

  &::after {
    content: '🔍';
    color: #94a3b8;
    font-size: 1rem;
    position: absolute;
    right: 12px;
  }

  &:hover {
    background-color: #f1f5f9;
    border-color: #2563eb;
  }
`;

const DetailAddressInput = styled(Input)`
  margin-top: 8px;
  background-color: white;
  border: 1px solid #e2e8f0;
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

export default AuthorForm;
