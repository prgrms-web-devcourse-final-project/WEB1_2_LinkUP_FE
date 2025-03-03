import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface Message {
  senderId: string;
  content: string;
  timestamp: string;
  type?: string;
}

interface ChatRoomProps {
  roomId: number;
  isAdmin?: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, isAdmin = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const userId = localStorage.getItem('userid') || '';
  // const baseURL = import.meta.env.VITE_API_URL || '';
  const token = localStorage.getItem('token');
  // 웹소켓 연결
  const connectWebSocket = () => {
    const socket = new SockJS(`http://15.164.5.135/websocket`);
    stompClientRef.current = Stomp.over(socket);

    const headers = { Authorization: `Bearer ${token}` };

    stompClientRef.current.connect(
      headers,
      () => {
        console.log(`Connected to WebSocket: roomId=${roomId}`);
        setIsConnected(true);

        // 구독
        stompClientRef.current?.subscribe(
          `/sub/message/${roomId}`,
          (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            setMessages((prevMessages) => [...prevMessages, message]);
          }
        );
      },
      (error) => {
        console.error('WebSocket 연결 실패:', error);
        setIsConnected(false);
        if (error) {
          console.error('WebSocket 오류 코드:', error);
        }

        if (error) {
          console.error('WebSocket 오류 메시지:', error);
        }
        if (stompClientRef.current) {
          console.error('현재 stompClient 상태:', stompClientRef.current);
        }
      }
    );
  };

  // 메세지 불러오기
  // const loadExistingMessages = () => {
  //   fetch(`${baseURL}/chat/${roomId}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('서버에서 메시지를 가져오는데 실패했습니다.');
  //       }
  //       return response.json();
  //     })
  //     .then((existingMessages) => {
  //       setMessages(existingMessages);
  //     })
  //     .catch((error) => {
  //       console.error('기존 메시지 로드 실패:', error);
  //     });
  // };

  // 페이지 렌더링시 웹소켓 연결, 메세지 불러오는 함수 호출
  useEffect(() => {
    connectWebSocket();
    // loadExistingMessages();

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          console.log('WebSocket 연결이 종료되었습니다.');
        });
      }
    };
  }, [roomId]);

  // 오토스크롤
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // 메세지 보내기
  const handleSendMessage = () => {
    if (!input.trim() || !isConnected) return;

    const message: Message = {
      senderId: isAdmin ? 'system' : userId,
      content: isAdmin ? `[관리자 메시지] ${input.trim()}` : input.trim(),
      timestamp: new Date().toISOString(),
    };

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send(
        `/pub/message/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput('');
    } else {
      alert('WebSocket이 연결되지 않았습니다. 잠시 후 다시 시도하세요.');
      // 재연결 시도
      connectWebSocket();
    }
  };

  // '시스템'이 보내는 메시지는 표시x, 내가 보내는 메시지는 '나'로 표시
  const getNicknameDisplay = (senderId: string): string => {
    if (senderId === 'system') return '';
    return senderId === userId ? '나' : senderId;
  };

  // 날짜 포맷
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    });
  };

  // 시간 포맷
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const addDateSeparators = (messages: Message[]) => {
    const result: Message[] = [];
    let lastDate = '';

    for (const message of messages) {
      if (message.timestamp) {
        const messageDate = formatDate(message.timestamp);
        if (messageDate !== lastDate) {
          result.push({
            type: 'date',
            content: messageDate,
            senderId: 'system',
            timestamp: message.timestamp,
          });
          lastDate = messageDate;
        }
      }
      result.push(message);
    }

    return result;
  };

  const messagesWithDateSeparators = addDateSeparators(messages);

  return (
    <ChatRoomContainer>
      <ConnectionStatus connected={isConnected.toString()}>
        {isConnected ? '연결됨' : '연결 중...'}
      </ConnectionStatus>

      <ChatMessagesContainer ref={chatBoxRef}>
        {messagesWithDateSeparators.length === 0 ? (
          <EmptyStateMessage>메시지가 없습니다.</EmptyStateMessage>
        ) : (
          messagesWithDateSeparators.map((msg, index) => (
            <MessageWrapper
              key={index}
              isCurrentUser={msg.senderId === userId}
              isSystemMessage={msg.senderId === 'system'}
              isDateDivider={msg.type === 'date'}
            >
              {msg.type === 'date' ? (
                <DateDivider>{msg.content}</DateDivider>
              ) : (
                <>
                  {msg.senderId !== 'system' && (
                    <SenderName>{getNicknameDisplay(msg.senderId)}</SenderName>
                  )}
                  <MessageContent
                    isCurrentUser={msg.senderId === userId}
                    isSystemMessage={msg.senderId === 'system'}
                  >
                    {msg.content}
                  </MessageContent>
                  {msg.timestamp && msg.senderId !== 'system' && (
                    <Timestamp>{formatTime(msg.timestamp)}</Timestamp>
                  )}
                </>
              )}
            </MessageWrapper>
          ))
        )}
      </ChatMessagesContainer>

      <MessageInputContainer>
        <MessageInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isConnected ? '메시지를 입력하세요.' : '연결 중...'}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!isConnected}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={!isConnected || !input.trim()}
        >
          <FaRegComment />
        </SendButton>
      </MessageInputContainer>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  position: relative;
`;
const ConnectionStatus = styled.div<{ connected: string }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background-color: ${({ connected }) =>
    connected === 'true' ? '#4caf50' : '#f44336'};
  color: white;
  font-size: 0.8rem;
  border-bottom-left-radius: 8px;
  z-index: 10;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const EmptyStateMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
  font-style: italic;
`;

const MessageWrapper = styled.div<{
  isCurrentUser: boolean;
  isSystemMessage: boolean;
  isDateDivider?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isCurrentUser, isSystemMessage, isDateDivider }) =>
    isDateDivider || isSystemMessage
      ? 'center'
      : isCurrentUser
        ? 'flex-end'
        : 'flex-start'};
  margin-bottom: ${({ isDateDivider }) => (isDateDivider ? '16px' : '12px')};
  width: 100%;
`;

const DateDivider = styled.div`
  text-align: center;
  padding: 4px 12px;
  background-color: #e2e2e2;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
  margin: 8px 0;
  position: relative;
  width: auto;
`;

const SenderName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const MessageContent = styled.div<{
  isCurrentUser: boolean;
  isSystemMessage: boolean;
}>`
  max-width: 70%;
  background-color: ${({ isCurrentUser, isSystemMessage }) =>
    isSystemMessage ? '#f0f0f0' : isCurrentUser ? '#d9f9d9' : '#e9e9e9'};
  color: #333;
  padding: 10px;
  border-radius: 12px;
  word-wrap: break-word;
  font-size: 1rem;
  white-space: pre-wrap;
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

  &:disabled {
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default ChatRoom;
