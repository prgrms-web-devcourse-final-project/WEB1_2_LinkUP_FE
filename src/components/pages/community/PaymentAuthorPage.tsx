import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { VirtualAccountResponse } from './api/paymentApi';
import VirtualAccountModal from './modal/VirtualAccountModal';

const PaymentAuthorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // PostDetailPage에서 전달된 데이터
  const { post, quantity } = state || {}; // 구조 분해 할당
  const [virtualAccount, setVirtualAccount] =
    useState<VirtualAccountResponse | null>(null); // 가상계좌 정보 저장
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    detailaddress: '',
    request: '',
  });

  if (!post) {
    return <div>잘못된 접근입니다. 게시물 정보를 찾을 수 없습니다.</div>;
  }

  const handleModalClose = () => setModalOpen(false);
  const handleModalComplete = (account: VirtualAccountResponse) => {
    setVirtualAccount(account);
    setModalOpen(false);
    alert(`가상계좌 발급 완료: ${account.virtualAccount?.accountNumber}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePayment = () => {
    if (!virtualAccount) {
      alert('먼저 가상계좌를 발급받아야 합니다.');
      return;
    }
    // DepositPage로 데이터 전달
    navigate(`/community/post/${post.id}/payment/deposit`, {
      state: {
        bankCode: virtualAccount.virtualAccount?.bankCode,
        accountNumber: virtualAccount.virtualAccount?.accountNumber,
        totalAmount: quantity * post.unitAmount,
        onConfirm: () => {
          alert('결제가 완료되었습니다.');
          navigate(`/community/post/${post.id}/payment/complete`, {
            state: {
              paymentKey: virtualAccount.paymentKey,
              orderId: virtualAccount.orderId,
              totalAmount: virtualAccount.totalAmount,
              title: post.title,
              unitPrice: post.unitAmount,
              quantity,
            },
          });
        },
      },
    });
  };

  return (
    <PaymentPageContainer>
      <ContentWrapper>
        <Header>
          <Title>공구 진행 결제(공구 참여자)</Title>
        </Header>
        <FormContainer>
          <Section>
            <SectionTitle>공구 모집 상품 정보</SectionTitle>
            <InfoContainer>
              {/* 이미지 섹션 */}
              <ImageContainer>
                <ImagePreviewWrapper>
                  <ImagePreview>
                    <img src={post.imageUrls[0]} alt={'이미지'} />
                  </ImagePreview>
                </ImagePreviewWrapper>
              </ImageContainer>
              {/* 상세 정보 섹션 */}
              <DetailsContainer>
                <Detail>
                  <Label>제목</Label>
                  <DetailText>{post.title}</DetailText>
                </Detail>
                <Detail>
                  <Label>개당 가격</Label>
                  {post.unitAmount.toLocaleString()} 원
                </Detail>
                <Detail>
                  <Label>수량</Label> <Quantity>{quantity}</Quantity>
                </Detail>
                <Detail>
                  <Label>결제 금액</Label>{' '}
                  <PaymentAmount>
                    {(quantity * post.unitAmount).toLocaleString()} 원
                  </PaymentAmount>
                </Detail>
              </DetailsContainer>
            </InfoContainer>
          </Section>

          <Section>
            <Title>배송 정보 확인</Title>
            <ContentBox>
              <Input
                placeholder="이름을 입력하세요."
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
              <Input
                placeholder="주소를 입력하세요."
                name="address"
                value={form.address}
                onChange={handleInputChange}
              />
              <Input
                placeholder="상세 주소를 입력하세요."
                name="detailaddress"
                value={form.detailaddress}
                onChange={handleInputChange}
              />
              <Input
                placeholder="배송 요청사항을 입력하세요."
                name="request"
                value={form.request}
                onChange={handleInputChange}
              />
            </ContentBox>
          </Section>

          <Section>
            <SectionTitle>결제 정보 확인</SectionTitle>
            <SelectButtonContainer>
              <VirtualAccountButton onClick={() => setModalOpen(true)}>
                가상계좌 발급
              </VirtualAccountButton>
            </SelectButtonContainer>
          </Section>
          <ButtonContainer>
            <ActionButton onClick={handlePayment}>결제하기</ActionButton>
            <ActionButton onClick={() => navigate(-1)}>뒤로가기</ActionButton>
          </ButtonContainer>
        </FormContainer>
      </ContentWrapper>

      {modalOpen && (
        <VirtualAccountModal
          orderId={`order-${Date.now()}`}
          amount={quantity * post.unitPrice}
          title={post.title}
          customerName="홍길동"
          customerEmail="customer@example.com"
          onClose={handleModalClose}
          onComplete={handleModalComplete}
        />
      )}
    </PaymentPageContainer>
  );
};

export default PaymentAuthorPage;

const PaymentPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  margin-top: 50px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`;

const Section = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const SectionTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 15px 20px;
  color: #333;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 400px; /* 고정된 높이 설정 */
  padding: 20px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 버튼 공간 확보 */
  align-items: center; /* 수직 중앙 정렬 */
  margin: auto 0;
  width: 100%;
  position: relative; /* 자식 요소 위치 기준 */
  overflow: hidden; /* 높이를 벗어난 콘텐츠 숨김 */
`;

const ImagePreview = styled.div`
  flex: 1; /* 이미지 영역이 버튼 사이에 위치 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #fff;
  border-radius: 10px;
  overflow: hidden; /* 콘텐츠가 영역을 벗어나지 않도록 */

  img {
    max-width: 100%; /* 부모 너비를 넘지 않도록 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 */
    object-fit: contain; /* 비율을 유지하며 부모 크기 안에 맞춤 */
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 490px;
  height: 400px; /* 고정된 높이 설정 */
  padding: 50px 20px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  margin-right: 15px;
  font-size: 1.4rem;
  font-weight: bold;
  flex-shrink: 0; /* 라벨 크기를 고정 */
`;

const DetailText = styled.div`
  display: -webkit-box; /* Flexbox 기반으로 동작 */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; /* 수직 방향 박스 정렬 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
  white-space: normal; /* 줄바꿈 허용 */
  color: #333; /* 텍스트 색상 */
`;

const Quantity = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PaymentAmount = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SelectButtonContainer = styled.div`
  display: flex;
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const VirtualAccountButton = styled.button`
  padding: 40px 50px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #f5f5f5;
  border: 1px solid #000;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e5e5e5;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  gap: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;
