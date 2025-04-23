import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaRegComment, FaTimes } from 'react-icons/fa';
import {
  fetchChatMessages,
  connectWebSocket,
  disconnectWebSocket,
  subscribeToChatMessages,
  unsubscribeFromChatMessages,
  sendMessage,
} from '../../api/chatApi';
import { getUser } from '../../api/mypageApi';

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
  isGuide?: boolean;
}

interface ChatRoomProps {
  chatRoomId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const fetchUserNickname = async () => {
      const response = await getUser();
      setCurrentUserId(response.nickname);
    };

    fetchUserNickname();
  }, []);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메시지 배열이 변경될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!chatRoomId || isNaN(chatRoomId)) return;

    const handleMessage = (message: Message) => {
      if (message && typeof message === 'object') {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    const connectAndSubscribe = async () => {
      if (isConnecting || isSubscribing) return;

      try {
        setIsConnecting(true);
        await connectWebSocket(
          handleMessage,
          async () => {
            try {
              setIsSubscribing(true);
              await subscribeToChatMessages(chatRoomId, handleMessage);
              setIsSubscribed(true);
              setIsConnected(true);
            } catch (error) {
              console.error('채팅방 구독 실패:', error);
              setIsSubscribed(false);
              setIsConnected(false);
              disconnectWebSocket();
            } finally {
              setIsSubscribing(false);
            }
          },
          () => {
            setIsConnected(false);
            setIsSubscribed(false);
          },
          (error) => {
            console.error('WebSocket 에러:', error);
            setIsConnected(false);
            setIsSubscribed(false);
          }
        );
      } catch (error) {
        console.error('WebSocket 연결 실패:', error);
        setIsConnected(false);
        setIsSubscribed(false);
      } finally {
        setIsConnecting(false);
      }
    };

    const disconnectAndUnsubscribe = async () => {
      if (isSubscribed) {
        try {
          await unsubscribeFromChatMessages(chatRoomId);
        } catch (error) {
          console.error('채팅방 구독 해제 실패:', error);
        }
      }

      if (isConnected) {
        try {
          await disconnectWebSocket();
        } catch (error) {
          console.error('WebSocket 연결 해제 실패:', error);
        }
      }

      setIsConnected(false);
      setIsSubscribed(false);
    };

    if (isOpen) {
      connectAndSubscribe();
    } else {
      disconnectAndUnsubscribe();
    }

    return () => {
      disconnectAndUnsubscribe();
    };
  }, [chatRoomId, isOpen]);

  // WebSocket 연결과 구독이 완료된 후에 채팅 내역을 불러옵니다
  useEffect(() => {
    const loadMessages = async () => {
      if (
        isConnected &&
        isSubscribed &&
        chatRoomId &&
        !isConnecting &&
        !isSubscribing
      ) {
        try {
          const chatMessages = await fetchChatMessages(chatRoomId);

          // 안내사항을 항상 첫 번째로 표시
          const guideMessage = {
            userName: '시스템',
            message:
              '안내사항:\n1. 상대방을 존중하는 대화를 나누어주세요.\n2. 개인정보는 절대 공유하지 마세요.\n3. 거래는 채팅방 외에서 진행해주세요.',
            time: new Date().toISOString(),
            isGuide: true,
          };

          setMessages([guideMessage, ...chatMessages]);
        } catch (error) {
          console.error('메시지 불러오기 실패:', error);
        }
      }
    };

    loadMessages();
  }, [isConnected, isSubscribed, chatRoomId, isConnecting, isSubscribing]);

  const handleSendMessage = () => {
    if (!input.trim() || !chatRoomId || !currentUserId) return;

    const messageTime = new Date().toISOString();
    sendMessage(chatRoomId, currentUserId, input.trim(), messageTime);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>채팅</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ChatRoomContainer>
          <ChatMessagesContainer ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <MessageWrapper
                key={index}
                $isCurrentUser={msg.userName === currentUserId}
                $isGuide={msg.isGuide}
              >
                {!msg.isGuide && (
                  <SenderName>
                    {msg.userName === currentUserId ? '나' : msg.userName}
                  </SenderName>
                )}
                <MessageContent
                  $isCurrentUser={msg.userName === currentUserId}
                  $isGuide={msg.isGuide}
                >
                  {msg.message}
                </MessageContent>
                {!msg.isGuide && (
                  <Timestamp>
                    {new Date(msg.time).toLocaleTimeString()}
                  </Timestamp>
                )}
              </MessageWrapper>
            ))}
            {/* 스크롤을 맨 아래로 이동시키기 위한 빈 div */}
            <div ref={messagesEndRef} />
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
  scroll-behavior: smooth;
`;

const MessageWrapper = styled.div<{
  $isCurrentUser: boolean;
  $isGuide?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isCurrentUser, $isGuide }) =>
    $isGuide ? 'center' : $isCurrentUser ? 'flex-end' : 'flex-start'};
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
  $isGuide?: boolean;
}>`
  max-width: 75%;
  background-color: ${({ $isCurrentUser, $isGuide }) =>
    $isGuide ? '#f0f7ff' : $isCurrentUser ? '#2563eb' : '#e2e8f0'};
  color: ${({ $isCurrentUser, $isGuide }) =>
    $isGuide ? '#2d3748' : $isCurrentUser ? '#ffffff' : '#1e293b'};
  padding: 12px 16px;
  border-radius: 16px;
  border-top-left-radius: ${({ $isCurrentUser, $isGuide }) =>
    $isGuide ? '16px' : $isCurrentUser ? '16px' : '4px'};
  border-top-right-radius: ${({ $isCurrentUser, $isGuide }) =>
    $isGuide ? '16px' : $isCurrentUser ? '4px' : '16px'};
  word-wrap: break-word;
  font-size: 0.95rem;
  line-height: 1.4;
  white-space: pre-wrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-align: ${({ $isGuide }) => ($isGuide ? 'center' : 'left')};
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
