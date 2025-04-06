import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaRegComment, FaTimes } from 'react-icons/fa';
import { fetchChatMessages } from '../../api/chatApi';
import { webSocketService } from '../../utils/webSocket';

interface Message {
  senderId: string;
  content: string;
  timestamp: string | null;
  type?: string;
}

interface ChatRoomProps {
  chatRoomId: number;
  isAdmin?: boolean; // 관리자 여부
  isOpen: boolean;
  onClose: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  chatRoomId,
  isAdmin = false,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'user-00001'; // Mock 로그인 사용자 ID

  useEffect(() => {
    if (!isOpen) return;

    // 채팅방 초기 메시지 및 채팅 메시지 가져오기
    const fetchMessages = async () => {
      const fetchedMessages = await fetchChatMessages(chatRoomId);

      // 입장 메시지 추가
      const joinMessage: Message = {
        senderId: 'system',
        content: `윤성님이 입장하셨습니다.`,
        timestamp: null, // timestamp 표시하지 않음
      };

      // 그룹 채팅 안내 메시지 추가
      const groupChatNotice: Message = {
        senderId: 'system',
        content: `
안내사항: 환불 및 이탈 관련 정책
  1. 환불 및 수령 시간/위치 조율
    - 공구 진행 중(최종 승인 이후)인 채팅방에서
    수령 위치 및 시간을 조율합니다.
    - 이탈자가 발생하거나 환불 요청이 있을 경우,
      이탈자는 채팅방에서 환불 의사를 명확히
      표시해야 하며, 모든 참여 인원이 동의한
      경우에 한해 환불이 진행됩니다.
  2. 환불 및 비용 부담
    - 환불 진행 시, 전체 환불 처리 및 해당 인원에
      대한 신고 접수가 이루어지며, 이로 인해
      발생하는 모든 비용(공구 물품 반송 등)은
      이탈자 본인이 전액 부담합니다.
  3. 이탈자에 대한 페널티 제도
    - 이탈 행위가 반복될 경우, 아래와 같은
      경고 시스템이 적용됩니다.
      - 1회 경고: 계정 일주일 정지
      - 3회 경고: 계정 한 달 정지
      - 5회 경고: 계정 영구 정지

  💡 주의: 본 안내사항을 숙지하지 않아 발생하는
              불이익은 본인에게 책임이 있습니다.

공구 진행에 차질이 없도록 적극적인 협조
부탁드립니다. 😊`,
        timestamp: null,
      };

      setMessages([joinMessage, groupChatNotice, ...fetchedMessages]);
    };

    fetchMessages();
  }, [chatRoomId, isOpen]);

  const getNicknameDisplay = (senderId: string): string => {
    if (senderId === 'system') return '';
    return senderId === currentUserId ? '나' : senderId;
  };

  useEffect(() => {
    if (!isOpen) return;

    // WebSocket 연결
    const handleIncomingMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    webSocketService.connect(() => {
      console.log('연결 성공');
      // webSocketService.subscribe(
      //   `/sub/message/${chatRoomId}`,
      //   (messageOutput) => {
      //     try {
      //       // messageOutput이 string이므로 JSON.parse() 수행
      //       const parsedMessage = JSON.parse(messageOutput);

      //       // 'body' 속성이 있는지 확인 후 처리
      //       if (
      //         parsedMessage &&
      //         typeof parsedMessage === 'object' &&
      //         'body' in parsedMessage
      //       ) {
      //         const data = JSON.parse(parsedMessage.body);
      //         handleIncomingMessage(data);
      //       } else {
      //         console.error('Invalid message format:', parsedMessage);
      //       }
      //     } catch (error) {
      //       console.error('Failed to parse WebSocket message:', error);
      //     }
      //   }
      // );
    });

    return () => {
      webSocketService.unsubscribe(`/sub/message/${chatRoomId}`);
      webSocketService.close();
    };
  }, [chatRoomId, isOpen]);

  useEffect(() => {
    // 채팅 박스 스크롤 관리
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const message: Message = {
      senderId: isAdmin ? 'system' : currentUserId,
      content: isAdmin ? `[관리자 메시지] ${input.trim()}` : input.trim(),
      timestamp: new Date().toISOString(),
    };

    webSocketService.send(
      `/pub/message/${chatRoomId}`,
      JSON.stringify(message)
    );
    setMessages((prev) => [...prev, message]);
    setInput('');
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    });
  };

  const addDateSeparators = (messages: Message[]) => {
    const result: Message[] = [];
    let lastDate = '';

    for (const message of messages) {
      const messageDate = message.timestamp
        ? formatDate(message.timestamp)
        : null;
      if (messageDate && messageDate !== lastDate) {
        result.push({
          type: 'date',
          content: messageDate,
          senderId: 'system',
          timestamp: null,
        });
        lastDate = messageDate;
      }
      result.push(message);
    }

    return result;
  };

  const formattedMessages = addDateSeparators(messages);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>채팅</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ChatRoomContainer>
          <ChatMessagesContainer>
            {formattedMessages.map((msg, index) => {
              const isGroupNotice =
                msg.senderId === 'system' &&
                msg.content?.includes('안내사항: 환불 및 이탈 관련 정책');

              if (msg.type === 'date') {
                return (
                  <DateSeparator key={`date-${index}`}>
                    {msg.content}
                  </DateSeparator>
                );
              }

              return (
                <MessageWrapper
                  key={index}
                  $isCurrentUser={msg.senderId === currentUserId}
                  $isSystemMessage={msg.senderId === 'system'}
                >
                  <SenderName>
                    {msg.senderId === 'system'
                      ? ''
                      : getNicknameDisplay(msg.senderId)}
                  </SenderName>
                  <MessageContent
                    $isCurrentUser={msg.senderId === currentUserId}
                    $isGroupNotice={isGroupNotice}
                    $isSystemMessage={msg.senderId === 'system'}
                  >
                    {msg.content}
                  </MessageContent>
                  {msg.timestamp && msg.senderId !== 'system' && (
                    <Timestamp>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Timestamp>
                  )}
                </MessageWrapper>
              );
            })}
            <div ref={chatBoxRef}></div>
          </ChatMessagesContainer>
          <MessageInputContainer>
            <MessageInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Enter 키 처리
            />
            <SendButton onClick={handleSendMessage} disabled={!input.trim()}>
              <FaRegComment />
            </SendButton>
          </MessageInputContainer>
        </ChatRoomContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatRoom;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  height: 80vh;
  max-height: 700px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #1e3a8a;
  color: white;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: #f8fafc;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f8fafc;
`;

const DateSeparator = styled.div`
  text-align: center;
  margin: 16px 0;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: #e2e8f0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const MessageWrapper = styled.div<{
  $isCurrentUser: boolean;
  $isSystemMessage?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isCurrentUser, $isSystemMessage }) =>
    $isSystemMessage ? 'center' : $isCurrentUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 12px;
  width: 100%;
`;

const SenderName = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 4px;
  padding: 0 8px;
`;

const MessageContent = styled.div<{
  $isCurrentUser: boolean;
  $isGroupNotice?: boolean;
  $isSystemMessage?: boolean;
}>`
  max-width: 75%;
  background-color: ${({ $isCurrentUser, $isGroupNotice, $isSystemMessage }) =>
    $isGroupNotice || $isSystemMessage
      ? '#f1f5f9'
      : $isCurrentUser
        ? '#2563eb'
        : '#e2e8f0'};
  color: ${({ $isCurrentUser }) => ($isCurrentUser ? '#ffffff' : '#1e293b')};
  padding: 12px 16px;
  border-radius: 16px;
  border-top-left-radius: ${({ $isCurrentUser }) =>
    $isCurrentUser ? '16px' : '4px'};
  border-top-right-radius: ${({ $isCurrentUser }) =>
    $isCurrentUser ? '4px' : '16px'};
  word-wrap: break-word;
  font-size: 0.95rem;
  line-height: 1.4;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-align: ${({ $isGroupNotice }) => ($isGroupNotice ? 'left' : 'inherit')};
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 4px;
  padding: 0 8px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #e2e8f0;
  background-color: #fff;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  outline: none;
  margin-right: 8px;
  background-color: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SendButton = styled.button`
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #2563eb;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 42px;
  height: 42px;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;
