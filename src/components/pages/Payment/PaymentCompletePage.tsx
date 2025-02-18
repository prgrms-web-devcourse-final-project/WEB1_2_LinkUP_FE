import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { createChatRoom } from '../../../api/chatApi';
import ChatRoomModal from '../community/modal/ChatRoomModal';
import { webSocketService } from '../../../utils/webSocket';
import { useQuantity } from '../../../context/QuantityContext';
import { usePostQuery } from '../../../hooks/useGetPost';
import { QueryHandler } from '../../../hooks/useGetProduct';

const PaymentCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const { quantity } = useQuantity();
  const { id } = useParams();
  if (!id) {
    return <p>상품 번호가 유실되었습니다.</p>;
  }
  const postId = Number(id);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const price = urlParams.get('amount');
  const { data: post, isLoading, isError } = usePostQuery(postId);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoom, setChatRoom] = useState<{
    id: number;
    roomName: string;
  } | null>(null);

  const handleChatRoomCreation = async () => {
    try {
      const chatRoom = await createChatRoom(parseInt(id));
      setChatRoom(chatRoom);
    } catch {
      alert('채팅방을 생성할 수 없습니다.');
    }
  };

  const openChat = async () => {
    if (!chatRoom) {
      await handleChatRoomCreation();
    }
    setIsChatOpen(true);
  };

  const closeChat = () => setIsChatOpen(false);

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
              <Value>{quantity}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>결제 금액</Label>
              <Value>{price}원</Value>
            </SummaryRow>
          </OrderSummary>
        </SuccessSection>

        <ButtonGroup>
          <OrderDetailButton onClick={openChat}>채팅방 열기</OrderDetailButton>
          <BackButton onClick={() => navigate('/mypage/orderlist')}>
            주문내역 보기
          </BackButton>
        </ButtonGroup>

        {chatRoom && (
          <ChatRoomModal
            isOpen={isChatOpen}
            onClose={closeChat}
            chatRoomId={chatRoom.id.toString()}
            chatRoomTitle={chatRoom.roomName}
            webSocketService={webSocketService}
            isAdminPage={false}
          />
        )}
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
