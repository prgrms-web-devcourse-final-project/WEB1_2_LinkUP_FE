import React, { useEffect } from 'react';
import styled from 'styled-components';
import ChatRoom from '../../../common/ChatRoom'; // 채팅방 컴포넌트
import {
  webSocketService,
  WebSocketService,
} from '../../../../utils/webSocket';
import { FaTrashAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteChatRoom } from '../api/chatApi';

interface ChatRoomModalProps {
  chatRoomId: string;
  chatRoomTitle: string;
  isOpen: boolean;
  onClose: () => void;
  webSocketService: WebSocketService;
  isAdminPage: boolean; // 관리자 페이지 여부를 나타내는 프롭
}

const ChatRoomModal: React.FC<ChatRoomModalProps> = ({
  isOpen,
  onClose,
  chatRoomId,
  chatRoomTitle,
  isAdminPage = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isChatAdminPage = isAdminPage || location.pathname === '/admin/chat';

  // URL 상태 반영
  useEffect(() => {
    if (isOpen) {
      navigate(`?roomId=${chatRoomId}`, { replace: true });
    } else {
      navigate(-1); // 원래 페이지로 돌아감
    }
  }, [isOpen, chatRoomId, navigate]);

  const handleDelete = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const roomId = urlParams.get('roomId');
      if (roomId) {
        await deleteChatRoom(parseInt(roomId)); // 채팅방 삭제 API 호출
        alert('채팅방이 성공적으로 삭제되었습니다.');
        onClose(); // 모달 닫기
      }
    } catch (error) {
      console.error('채팅방 삭제 실패:', error);
      alert('채팅방을 삭제할 수 없습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{chatRoomTitle}</ModalTitle>
          <HeaderButtons>
            {/* 삭제 버튼: 관리자 채팅방 관리 페이지에서만 보이도록 조건부 렌더링 */}
            {isChatAdminPage && (
              <DeleteButton onClick={handleDelete}>
                <FaTrashAlt />
              </DeleteButton>
            )}
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </HeaderButtons>
        </ModalHeader>
        <ModalContent>
          <ChatRoom
            chatRoomId={parseInt(chatRoomId, 10)}
            chatMembers={[]}
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
