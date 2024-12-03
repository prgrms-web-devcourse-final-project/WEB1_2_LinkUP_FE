import React, { useState } from 'react';
import styled from 'styled-components';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { fetchChatRoomDetails } from './api/chatApi';
import { mockFetchChatRoomDetails } from '../../../mocks/chatData';
import ChatRoomModal from './modal/ChatRoomModal'; // 채팅방 모달 컴포넌트 가져오기
import { webSocketService } from '../../../utils/webSocket';

const PaymentCompletePage = () => {
  const navigate = useNavigate();
  //   const { state } = useLocation(); // 결제 페이지에서 전달된 상태
  //   const { post } = state || {}; // Post 데이터 구조 분해 할당

  const [isChatOpen, setIsChatOpen] = useState(false); // 채팅방 모달 상태
  //   const [chatRoomId, setChatRoomId] = useState<string | null>(null); // 채팅방 ID 상태 추가
  const [chatRoomId, setChatRoomId] = useState<string>('room-1'); // Mock 데이터의 첫 번째 채팅방 ID
  const [chatRoomTitle, setChatRoomTitle] = useState<string>(''); // 채팅방 제목 상태 추가

  const openChat = async () => {
    try {
      //   if (!post) {
      //     throw new Error('게시물 정보를 찾을 수 없습니다.');
      //   }

      // 채팅방 세부 정보 조회 API 호출
      //   const { chatRoomId, chatRoomTitle } = await fetchChatRoomDetails(
      //     post.postId
      //   );
      const { chatRoomTitle } = await mockFetchChatRoomDetails(chatRoomId);
      setChatRoomId(chatRoomId);
      setChatRoomTitle(chatRoomTitle);
      setIsChatOpen(true);
    } catch (error) {
      console.error('채팅방 열기 오류:', error);
      alert('채팅방을 열 수 없습니다.');
    }
  };

  const closeChat = () => setIsChatOpen(false);

  return (
    <PaymentCompleteContainer>
      <Message>결제가 정상적으로 완료되었습니다.</Message>
      <ButtonContainer>
        <ActionButton onClick={openChat}>채팅방 열기</ActionButton>
        <ActionButton onClick={() => navigate('/mypage/orderlist')}>
          주문내역 보기
        </ActionButton>
      </ButtonContainer>

      {/* 채팅방 모달 */}
      {chatRoomId && (
        <ChatRoomModal
          isOpen={isChatOpen}
          onClose={closeChat}
          chatRoomId={chatRoomId}
          chatRoomTitle={chatRoomTitle} // 채팅방 제목 전달
          webSocketService={webSocketService} // WebSocket 서비스 전달
          isAdminPage={false}
        />
      )}
    </PaymentCompleteContainer>
  );
};

export default PaymentCompletePage;

// 스타일 컴포넌트
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
