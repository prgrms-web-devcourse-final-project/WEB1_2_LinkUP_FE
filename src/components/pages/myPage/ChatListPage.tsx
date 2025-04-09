import React, { useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import { PageTitle } from './OrderListPage';
import { useChatQuery } from '../../../hooks/useGetChatRoom';
import { QueryHandler } from '../../../hooks/useGetProduct';
import styled from 'styled-components';
import ChatRoom from '../../common/ChatRoom';
import { Chat } from '../../../api/chatApi';

const ChatListPage: React.FC = () => {
  const {
    data: chats,
    isLoading: LoadingChat,
    isError: ErrorChat,
  } = useChatQuery();

  const [isModalOpenc, setModalOpenc] = useState(false);
  // const handleEnterChat = (postId) => {
  //   // 채팅방 입장 함수 - 실제 구현 시 적절한 경로로 변경해주세요
  //   navigate(`/chat/${postId}`);
  // };

  return (
    <QueryHandler isLoading={LoadingChat} isError={ErrorChat}>
      <GS.Wrapper>
        <Sidemenu />
        <GS.Content>
          <PageTitle>나의 채팅방 목록</PageTitle>

          {chats && chats.length > 0 ? (
            <ChatListContainer>
              {chats.map((chat: Chat, index: number) => (
                <ChatRoomCard key={index}>
                  <ChatRoomHeader>
                    <ChatRoomName>{chat.roomName}</ChatRoomName>
                    <ParticipantCount>
                      <ParticipantIcon>👥</ParticipantIcon>
                      {chat.chatMembers.length}/{chat.capacity}
                    </ParticipantCount>
                  </ChatRoomHeader>

                  <ChatRoomInfo>
                    <InfoItem>
                      <InfoLabel>상품번호:</InfoLabel>
                      <InfoValue>{chat.postId}</InfoValue>
                    </InfoItem>

                    <InfoItem>
                      <InfoLabel>참여자:</InfoLabel>
                      <MemberList>
                        {chat.chatMembers.map(
                          (member: string, memberIndex: number) => (
                            <MemberTag key={memberIndex}>{member}</MemberTag>
                          )
                        )}
                      </MemberList>
                    </InfoItem>
                  </ChatRoomInfo>

                  <ButtonsContainer>
                    <EnterButton onClick={() => setModalOpenc(true)}>
                      입장하기
                    </EnterButton>
                  </ButtonsContainer>
                </ChatRoomCard>
              ))}{' '}
              <ChatRoom
                chatRoomId={4}
                isOpen={isModalOpenc}
                onClose={() => setModalOpenc(false)}
              />
            </ChatListContainer>
          ) : (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <EmptyText>참여 중인 채팅방이 없습니다.</EmptyText>
            </EmptyState>
          )}
        </GS.Content>
      </GS.Wrapper>
    </QueryHandler>
  );
};

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
`;

const ChatRoomCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 20px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border: 1px solid #f0f7ff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 181, 246, 0.15);
  }
`;

const ChatRoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f7ff;
`;

const ChatRoomName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #4a90e2;
  margin: 0;
`;

const ParticipantCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64b5f6;
  background-color: #f5faff;
  padding: 4px 10px;
  border-radius: 20px;
`;

const ParticipantIcon = styled.span`
  margin-right: 5px;
`;

const ChatRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
`;

const InfoLabel = styled.span`
  color: #666;
  width: 70px;
  flex-shrink: 0;
`;

const InfoValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const MemberTag = styled.span`
  background-color: #ebf5ff;
  color: #4a90e2;
  font-size: 13px;
  padding: 3px 10px;
  border-radius: 12px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const EnterButton = styled.button`
  padding: 8px 18px;
  font-size: 14px;
  color: #fff;
  background-color: #64b5f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #42a5f5;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(66, 165, 245, 0.3);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #888;
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #888;
`;

export default ChatListPage;
