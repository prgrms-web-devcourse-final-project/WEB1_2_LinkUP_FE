import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatRoomModal from '../community/modal/ChatRoomModal'; // 기존 채팅 모달 컴포넌트
import Pagination from '../../common/Pagination'; // 기존 페이지네이션 컴포넌트
import { fetchAllChatRooms } from '../../../api/chatApi';
import { FaBackspace } from 'react-icons/fa';
import { webSocketService } from '../../../utils/webSocket';

const ITEMS_PER_PAGE = 12; // 페이지당 카드 수

const ChatRoomManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chatRooms, setChatRooms] = useState<
    {
      postId: number;
      roomName: string;
      chatMembers: string[];
    }[]
  >([]); // 채팅방 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  // URL에서 chatRoomId 동적으로 가져오기
  const urlParams = new URLSearchParams(location.search);
  const roomId = Number(urlParams.get('roomId')); // URL에서 roomId 가져오기

  // 총 페이지 수 계산
  const totalPages = Math.ceil(chatRooms.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      const rooms = await fetchAllChatRooms();
      setChatRooms(rooms);
    };

    fetchData();
  }, []);

  // 페이지네이션 처리
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedChatRooms = chatRooms.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleCardClick = () => {
    setModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
    navigate(-1); // URL 복구
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>채팅방 관리</Title>
          <HeaderWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <FaBackspace size={24} />
            </BackButton>
          </HeaderWrapper>
        </Header>

        <FormContainer>
          <ChatRoomList>
            {paginatedChatRooms.map((room) => (
              <ChatRoomCard key={room.postId} onClick={handleCardClick}>
                <ChatRoomTitle>{room.roomName}</ChatRoomTitle>
                <Participants>
                  참여자: {room.chatMembers.join(', ')}
                </Participants>
              </ChatRoomCard>
            ))}
          </ChatRoomList>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {isModalOpen && roomId && (
            <ChatRoomModal
              chatRoomId={roomId} // roomId는 URL에서 가져옴
              chatRoomTitle={
                chatRooms.find((room) => room.postId === roomId)?.roomName || ''
              }
              isOpen={isModalOpen}
              onClose={closeModal}
              webSocketService={webSocketService}
              isAdminPage={true}
            />
          )}
        </FormContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ChatRoomManagementPage;

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column; /* Title과 HeaderWrapper를 세로로 배치 */
  gap: 10px; /* Title과 HeaderWrapper 사이 간격 */
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
  margin: 0; /* Title의 기본 마진 제거 */
`;

const HeaderWrapper = styled.div`
  width: 1000px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatRoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const ChatRoomCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f1f1f1;
  }
`;

const ChatRoomTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Participants = styled.p`
  font-size: 14px;
  color: #666;
`;
