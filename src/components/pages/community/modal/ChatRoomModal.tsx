import React from 'react';
import styled from 'styled-components';
import ChatRoom from '../../../common/ChatRoom'; // 채팅방 컴포넌트
import {
  webSocketService,
  WebSocketService,
} from '../../../../utils/webSocket';
import { FaTrashAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

interface ChatRoomModalProps {
  chatRoomId: string;
  chatRoomTitle: string;
  isOpen: boolean;
  onClose: () => void;
  webSocketService: WebSocketService;
  onDelete: () => void;
  isAdminPage: boolean; // 관리자 페이지 여부를 나타내는 프롭
}

const ChatRoomModal: React.FC<ChatRoomModalProps> = ({
  isOpen,
  onClose,
  chatRoomId,
  chatRoomTitle,
  onDelete,
  isAdminPage = false,
}) => {
  const location = useLocation();

  const isChatAdminPage = isAdminPage || location.pathname === '/admin/chat';

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{chatRoomTitle}</ModalTitle>
          <HeaderButtons>
            {/* 삭제 버튼: 관리자 채팅방 관리 페이지에서만 보이도록 조건부 렌더링 */}
            {isChatAdminPage && (
              <DeleteButton onClick={onDelete}>
                <FaTrashAlt />
              </DeleteButton>
            )}
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </HeaderButtons>
        </ModalHeader>
        <ModalContent>
          <ChatRoom
            chatRoomId={chatRoomId}
            webSocketService={webSocketService}
            isAdmin={isAdminPage}
          />
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
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const CloseButton = styled.button`
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
