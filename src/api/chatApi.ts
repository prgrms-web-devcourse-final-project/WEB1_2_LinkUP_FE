import axiosInstance from './axiosInstance';
import { webSocketService } from '../utils/webSocket';

export interface Chat {
  postId: number;
  capacity: number;
  roomName: string;
  chatMembers: string[];
}

// 채팅방 삭제
export const deleteChatRoom = async (chatRoomId: number) => {
  const response = await axiosInstance.delete(`/api/chat/${chatRoomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to delete chat room');
  }

  // 채팅방 구독 취소
  webSocketService.unsubscribe(`/sub/message/${chatRoomId}`);
  return response.data;
};

// 내 채팅방 목록 조회
export const fetchMyChatRooms = async () => {
  const response = await axiosInstance.get('/api/mypage/chatlist');

  if (response.status !== 200) {
    throw new Error('Failed to fetch my chat rooms');
  }

  return response.data;
};

// 전체 채팅방 목록 조회 (관리자)
export const fetchAllChatRooms = async (): Promise<Chat[]> => {
  const response = await axiosInstance.get('/api/admin/chatlist');

  if (response.status !== 200) {
    throw new Error('Failed to fetch all chat rooms');
  }

  return response.data;
};

// 채팅 메시지 발행
export const sendMessage = (
  chatRoomId: number,
  userName: string,
  message: string,
  time: string
) => {
  const payload = {
    roomId: chatRoomId,
    userName: userName,
    message: message,
    time: time,
  };

  webSocketService.send(`${chatRoomId}`, payload);
};

// 채팅 메시지 구독
export const subscribeToChatMessages = (
  chatRoomId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (message: any) => void
) => {
  webSocketService.subscribe(`${chatRoomId}`, callback);
};

// 채팅 메시지 구독 취소
export const unsubscribeFromChatMessages = (chatRoomId: number) => {
  webSocketService.unsubscribe(`/sub/message/${chatRoomId}`);
};

// 채팅 내용 조회
export const fetchChatMessages = async (chatRoomId: number) => {
  const response = await axiosInstance.get(`/api/chat/${chatRoomId}`);

  if (response.status !== 200) {
    throw new Error('Failed to fetch chat messages');
  }
  return response.data;
};

// WebSocket 연결 관리
export const connectWebSocket = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMessage: (message: any) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onError?: (error: Event) => void
) => {
  webSocketService.connect(onMessage, onOpen, onClose, onError);
};

// WebSocket 연결 해제
export const disconnectWebSocket = () => {
  webSocketService.disconnect();
};
