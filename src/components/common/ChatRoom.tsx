import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaRegComment, FaTimes } from 'react-icons/fa';

import {
  WebSocketService,
  webSocketService as defaultWebSocketService,
} from '../../utils/webSocket';

interface Message {
  roomId?: number;
  userName: string;
  message: string;
  time: string;
  // 백엔드와 호환성을 위한 추가 속성들
  senderId?: string;
  content?: string;
  timestamp?: string | null;
  type?: string;
}

interface ChatRoomProps {
  chatRoomId: number;
  isOpen: boolean;
  onClose: () => void;
  webSocketService?: WebSocketService<Message>;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  chatRoomId,
  isOpen,
  onClose,
  webSocketService: externalWebSocketService,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // 외부에서 webSocketService가 제공되지 않으면 기본 서비스 사용
  const webSocketService = externalWebSocketService || defaultWebSocketService;

  useEffect(() => {
    // 웹소켓 연결 상태 확인 및 연결
    if (!webSocketService.isConnected()) {
      console.log('WebSocket을 내부에서 초기화합니다.');
      // Mock 모드 비활성화
      // webSocketService.enableMockMode();
    }
  }, [webSocketService]);

  useEffect(() => {
    if (!chatRoomId || isNaN(chatRoomId)) {
      console.error('유효하지 않은 채팅방 ID입니다.');
      return;
    }

    console.log('Using chatRoomId:', chatRoomId);
    const accessToken =
      sessionStorage.getItem('token') || localStorage.getItem('token');
    const fetchMessages = async () => {
      try {
        // API 경로 수정
        console.log('Fetching messages for room ID:', chatRoomId);

        const response = await fetch(
          `https://goodbuyus.store/api/chat/${chatRoomId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `메시지를 가져오는데 실패했습니다. 상태 코드: ${response.status}`
          );
        }

        const data = await response.json();
        console.log('Fetched messages data:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // WebSocket 연결
    webSocketService.connect(
      (message) => {
        console.log('수신된 메시지:', message);
        if (message && typeof message === 'object') {
          // 이미 있는 메시지인지 확인하여 중복 방지
          setMessages((prevMessages) => {
            // 메시지에 고유 식별자가 없으므로 내용과 시간으로 비교
            const isDuplicate = prevMessages.some(
              (m) => m.message === message.message && m.time === message.time
            );

            if (isDuplicate) {
              console.log('중복 메시지 무시:', message);
              return prevMessages;
            }

            console.log('새 메시지 추가:', message);
            return [...prevMessages, message];
          });
        }
      },
      () => {
        console.log('WebSocket connected - 채팅방 ID:', chatRoomId);
        // 채팅방 구독 - 반드시 chatRoomId.toString()으로 문자열 변환
        const roomIdStr = chatRoomId.toString();
        console.log(`채팅방 구독 시작: ${roomIdStr}`);

        webSocketService.subscribe(roomIdStr, (message) => {
          console.log('구독 채널에서 메시지 수신:', message);
          if (message && typeof message === 'object') {
            // 중복 메시지 방지
            setMessages((prevMessages) => {
              // 메시지에 고유 식별자가 없으므로 내용과 시간으로 비교
              const isDuplicate = prevMessages.some(
                (m) => m.message === message.message && m.time === message.time
              );

              if (isDuplicate) {
                console.log('중복 메시지 무시:', message);
                return prevMessages;
              }

              console.log('새 메시지 추가:', message);
              return [...prevMessages, message];
            });
          }
        });
      },
      () => {
        console.log('WebSocket disconnected');
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );

    return () => {
      const roomIdStr = chatRoomId.toString();
      console.log(`채팅방 구독 해제: ${roomIdStr}`);
      webSocketService.unsubscribe(roomIdStr);
      webSocketService.disconnect();
    };
  }, [chatRoomId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // 세션 스토리지 또는 로컬 스토리지에서 사용자 정보 가져오기
        const accessToken =
          sessionStorage.getItem('accessToken') ||
          localStorage.getItem('accessToken');
        const nickname =
          sessionStorage.getItem('nickname') ||
          localStorage.getItem('nickname');

        if (nickname) {
          console.log('저장된 닉네임 사용:', nickname);
          setCurrentUserId(nickname);
          return;
        }

        if (!accessToken) {
          console.warn('로그인 정보가 없습니다. 임시 닉네임을 사용합니다.');
          const tempNickname =
            prompt('채팅에 사용할 닉네임을 입력해주세요:') || '손님';
          sessionStorage.setItem('nickname', tempNickname);
          setCurrentUserId(tempNickname);
          return;
        }

        // JWT 토큰에서 사용자 정보 추출 시도
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          // 닉네임 필드가 있으면 우선 사용, 없으면 이메일 사용
          const userNickname =
            payload.nickname || payload.name || payload.email || payload.sub;
          console.log('토큰에서 추출한 사용자 정보:', userNickname);
          setCurrentUserId(userNickname);
          // 닉네임 저장
          sessionStorage.setItem('nickname', userNickname);
        } catch (err) {
          console.error('토큰 디코딩 오류:', err);
          const tempNickname =
            prompt('채팅에 사용할 닉네임을 입력해주세요:') || '손님';
          sessionStorage.setItem('nickname', tempNickname);
          setCurrentUserId(tempNickname);
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
        const tempNickname =
          prompt('채팅에 사용할 닉네임을 입력해주세요:') || '손님';
        sessionStorage.setItem('nickname', tempNickname);
        setCurrentUserId(tempNickname);
      }
    };

    fetchCurrentUser();
  }, []);

  const formatMessageContent = (message: Message) => {
    // message.message 필드가 있으면 사용, 없으면 content 필드 사용 (호환성 유지)
    return message.message || message.content;
  };

  const formatSenderName = (message: Message) => {
    // userName 필드가 있으면 사용, 없으면 senderId 필드 사용 (호환성 유지)
    const sender = message.userName || message.senderId;
    if (!sender || sender === 'system') return '';
    return sender === currentUserId ? '나' : sender;
  };

  const formatMessageTime = (message: Message) => {
    // time 필드가 있으면 사용, 없으면 timestamp 필드 사용 (호환성 유지)
    const timestamp = message.time || message.timestamp;
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleTimeString();
  };

  useEffect(() => {
    // 채팅 박스 스크롤 관리
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    if (!chatRoomId) {
      console.error('채팅방 ID가 없어 메시지를 보낼 수 없습니다.');
      return;
    }

    if (!currentUserId) {
      console.error('닉네임이 없어 메시지를 보낼 수 없습니다.');
      const tempNickname =
        prompt('채팅에 사용할 닉네임을 입력해주세요:') || '손님';
      sessionStorage.setItem('nickname', tempNickname);
      setCurrentUserId(tempNickname);
      if (!tempNickname) return;
    }

    console.log(
      '메시지 전송 시도. 채팅방 ID:',
      chatRoomId,
      '닉네임:',
      currentUserId
    );

    const message: Message = {
      roomId: chatRoomId,
      userName: currentUserId, // 닉네임 사용
      message: input.trim(), // 메시지 내용
      time: new Date().toISOString(), // ISO 8601 형식의 시간
    };

    console.log('전송할 메시지 내용:', message);
    // 채팅방 ID를 문자열로 변환하여 전송
    webSocketService.send(chatRoomId.toString(), message);
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
      const messageDate = message.time ? formatDate(message.time) : null;
      if (messageDate && messageDate !== lastDate) {
        // 날짜 구분자 추가
        result.push({
          type: 'date',
          content: messageDate,
          senderId: 'system',
          timestamp: null,
          userName: 'system',
          message: messageDate,
          time: new Date().toISOString(),
        });
        lastDate = messageDate;
      }
      result.push(message);
    }

    return result;
  };

  const formattedMessages = addDateSeparators(messages);

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>채팅</ModalTitle>
          <CloseButton onClick={() => {}}>
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
                    {msg.senderId === 'system' ? '' : formatSenderName(msg)}
                  </SenderName>
                  <MessageContent
                    $isCurrentUser={msg.senderId === currentUserId}
                    $isGroupNotice={isGroupNotice}
                    $isSystemMessage={msg.senderId === 'system'}
                  >
                    {formatMessageContent(msg)}
                  </MessageContent>
                  {formatMessageTime(msg) && msg.senderId !== 'system' && (
                    <Timestamp>{formatMessageTime(msg)}</Timestamp>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>
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
