import React from 'react';
import styled from 'styled-components';
import ChatRoom from '../../../common/ChatRoom'; // 채팅방 컴포넌트
import { WebSocketService } from '../../../../utils/webSocket';

interface ChatRoomModalProps {
  chatRoomId: string;
  chatRoomTitle: string;
  isOpen: boolean;
  onClose: () => void;
  webSocketService: WebSocketService;
}

const ChatRoomModal: React.FC<ChatRoomModalProps> = ({
  isOpen,
  onClose,
  chatRoomId,
  chatRoomTitle,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{chatRoomTitle}</ModalTitle>
          <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <ChatRoom chatRoomId={chatRoomId} />
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatRoomModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;
