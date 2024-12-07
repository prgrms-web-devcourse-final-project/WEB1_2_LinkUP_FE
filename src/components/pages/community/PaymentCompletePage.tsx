import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPaymentStatus } from './api/paymentApi';
import { fetchPostById } from './api/postApi';
import { createChatRoom } from './api/chatApi';
import ChatRoomModal from './modal/ChatRoomModal';
import { webSocketService } from '../../../utils/webSocket';

interface Post {
  title: string;
  unitAmount: number;
}

const PaymentCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  if (!state || !state.communityPostId || !state.quantity) {
    return <div>잘못된 접근입니다.</div>;
  }

  const { communityPostId, quantity } = state;

  const [paymentData, setPaymentData] = useState<{
    paymentKey: string;
    orderId: string;
    totalAmount: number;
  } | null>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [status, setStatus] = useState<'WAITING_FOR_DEPOSIT' | 'DONE'>(
    'WAITING_FOR_DEPOSIT'
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoom, setChatRoom] = useState<{
    id: number;
    roomName: string;
  } | null>(null);

  useEffect(() => {
    // 결제 상태 가져오기
    const fetchPayment = async () => {
      try {
        const data = await fetchPaymentStatus(communityPostId);
        setPaymentData(data);
        if (data.status === 'DONE') {
          setStatus('DONE');
        }
      } catch (error) {
        console.error('결제 상태 조회 오류:', error);
        alert('결제 상태를 확인할 수 없습니다.');
      }
    };

    // 게시물 정보 가져오기
    const fetchPost = async () => {
      try {
        const postData = await fetchPostById(Number(communityPostId));
        setPost({
          title: postData.title,
          unitAmount: postData.unitAmount,
        });
      } catch (error) {
        console.error('게시물 정보 조회 오류:', error);
        alert('게시물 정보를 가져올 수 없습니다.');
      }
    };

    fetchPayment();
    fetchPost();
  }, [communityPostId]);

  const handleChatRoomCreation = async () => {
    try {
      const chatRoom = await createChatRoom(parseInt(communityPostId));
      setChatRoom(chatRoom);
    } catch (error) {
      console.error('채팅방 생성 오류:', error);
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

  if (!paymentData || !post) {
    return <div>로딩 중...</div>;
  }

  return (
    <PaymentCompleteContainer>
      {status === 'WAITING_FOR_DEPOSIT' ? (
        <>
          <Message>결제 상태를 확인 중입니다...</Message>
        </>
      ) : (
        <>
          <Message>결제가 정상적으로 완료되었습니다.</Message>
          <OrderInformation>
            <p>주문 ID: {paymentData.orderId}</p>
            <p>상품명: {post.title}</p>
            <p>개당 가격: {post.unitAmount.toLocaleString()} 원</p>
            <p>수량: {quantity}</p>
            <p>결제 금액: {paymentData.totalAmount.toLocaleString()} 원</p>
          </OrderInformation>
        </>
      )}
      <ButtonContainer>
        <ActionButton onClick={openChat}>채팅방 열기</ActionButton>
        <ActionButton onClick={() => navigate('/mypage/orderlist')}>
          주문내역 보기
        </ActionButton>
      </ButtonContainer>

      {/* 채팅방 모달 */}
      {chatRoom && (
        <ChatRoomModal
          isOpen={isChatOpen}
          onClose={closeChat}
          chatRoomId={chatRoom.id.toString()}
          chatRoomTitle={chatRoom.roomName} // 채팅방 제목 전달
          webSocketService={webSocketService} // WebSocket 서비스 전달
          isAdminPage={false}
        />
      )}
    </PaymentCompleteContainer>
  );
};

export default PaymentCompletePage;

const PaymentCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  text-align: center;
`;

const Message = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const OrderInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;
