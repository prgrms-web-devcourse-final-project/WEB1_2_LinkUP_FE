import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import { fetchChatMessages } from '../pages/community/api/chatApi';
import { webSocketService } from '../../utils/webSocket';

interface Message {
  senderId: string;
  content: string;
  timestamp: string | null;
  type?: string;
}

interface ChatRoomProps {
  chatRoomId: number;
  chatMembers: string[];
  webSocketService: typeof webSocketService;
  isAdmin?: boolean; // 관리자 여부
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  chatRoomId,
  chatMembers,
  webSocketService,
  isAdmin = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'user-00001'; // Mock 로그인 사용자 ID

  useEffect(() => {
    // 채팅방 초기 메시지 및 채팅 메시지 가져오기
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchChatMessages(chatRoomId);

        // 입장 메시지 추가
        const joinMessage: Message = {
          senderId: 'system',
          content: `${chatMembers
            .map((member) => getNicknameDisplay(member))
            .join(', ')}님이 입장하셨습니다.`,
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
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [chatRoomId, chatMembers]);

  const getNicknameDisplay = (senderId: string): string => {
    if (senderId === 'system') return '';
    return senderId === currentUserId ? '나' : senderId;
  };

  useEffect(() => {
    // WebSocket 연결
    const handleIncomingMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    webSocketService.connect(
      () => {
        webSocketService.subscribe(
          `/sub/message/${chatRoomId}`,
          (messageOutput) => {
            const data = JSON.parse(messageOutput.body);
            handleIncomingMessage(data);
          }
        );
        console.log('WebSocket connected to room');
      },
      () => console.log('WebSocket disconnected'),
      () => console.error('WebSocket connection error')
    );

    return () => {
      webSocketService.unsubscribe(`/sub/message/${chatRoomId}`);
      webSocketService.close();
    };
  }, [chatRoomId, webSocketService]);

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

  return (
    <ChatRoomContainer>
      <ChatMessagesContainer>
        {formattedMessages.map((msg, index) => {
          const isGroupNotice =
            msg.senderId === 'system' &&
            msg.content?.includes('안내사항: 환불 및 이탈 관련 정책');
          if (msg.type === 'date') {
            return (
              <DateSeparator key={`date-${index}`}>{msg.content}</DateSeparator>
            );
          }
          return (
            <MessageWrapper
              key={index}
              isCurrentUser={msg.senderId === currentUserId}
              isSystemMessage={msg.senderId === 'system'}
            >
              <SenderName>
                {msg.senderId === 'system'
                  ? ''
                  : getNicknameDisplay(msg.senderId)}
              </SenderName>
              <MessageContent
                isCurrentUser={msg.senderId === currentUserId}
                isGroupNotice={isGroupNotice}
                isSystemMessage={msg.senderId === 'system'}
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
  );
};

export default ChatRoom;

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const DateSeparator = styled.div`
  text-align: center;
  margin: 10px 0;
  font-size: 0.9rem;
  color: #888;
  font-weight: bold;
`;

const MessageWrapper = styled.div<{
  isCurrentUser: boolean;
  isSystemMessage?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isCurrentUser, isSystemMessage }) =>
    isSystemMessage ? 'center' : isCurrentUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 12px;
`;

const SenderName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const MessageContent = styled.div<{
  isCurrentUser: boolean;
  isGroupNotice?: boolean;
  isSystemMessage?: boolean;
}>`
  max-width: 70%;
  background-color: ${({ isCurrentUser, isGroupNotice, isSystemMessage }) =>
    isGroupNotice || isSystemMessage
      ? '#cecece'
      : isCurrentUser
        ? '#d9f9d9'
        : '#e9e9e9'};
  color: #333;
  padding: 10px;
  border-radius: 12px;
  word-wrap: break-word;
  font-size: 1rem;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  text-align: ${({ isGroupNotice }) => (isGroupNotice ? 'left' : 'inherit')};
`;

const Timestamp = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ccc;
  background-color: #fff;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  margin-right: 8px;
`;

const SendButton = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
