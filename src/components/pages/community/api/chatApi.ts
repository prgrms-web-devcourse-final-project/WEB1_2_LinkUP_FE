import { formatDateWithOffset } from './../../../../utils/formatDate';
import axiosInstance from '../../../../api/axiosInstance';
import { webSocketService } from '../../../../utils/webSocket';

// 채팅방 생성
export const createChatRoom = async (postId: number) => {
  const response = await axiosInstance.post('/api/chat', { postId });
  if (response.status !== 200) {
    throw new Error('Failed to create chat room');
  }

  const { id, roomName } = response.data;
  console.log(`Chat room created: ${roomName} (ID: ${id})`);

  // 채팅방 구독 시작
  webSocketService.subscribe(
    `/sub/message/${id}`,
    (message) => {
      console.log(`Message in room ${id}:`, message);
    },
    true
  );

  return response.data;
};

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

  console.log(`Chat room ${chatRoomId} deleted`);

  // 채팅방 구독 취소
  webSocketService.unsubscribe(`/sub/message/${chatRoomId}`);
  return response.data;
};

// 내 채팅방 목록 조회
export const fetchMyChatRooms = async () => {
  const response = await axiosInstance.get('/api/mypage/chatlist', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch my chat rooms');
  }

  console.log('Fetched my chat rooms:', response.data);
  return response.data;
};

// 전체 채팅방 목록 조회 (관리자)
export const fetchAllChatRooms = async () => {
  const response = await axiosInstance.get('/api/admin/chatlist', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch all chat rooms');
  }

  console.log('Fetched all chat rooms:', response.data);
  return response.data;
};

// 채팅 메시지 발행
export const sendMessage = (
  chatRoomId: number,
  userName: string,
  message: string
) => {
  const payload = {
    roomId: chatRoomId,
    userName,
    message,
    time: formatDateWithOffset(new Date().toISOString()),
  };

  webSocketService.send(`/pub/message/${chatRoomId}`, payload);
  console.log(`Message sent to room ${chatRoomId}:`, payload);
};

// 채팅 메시지 구독
export const subscribeToChatMessages = (
  chatRoomId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (message: any) => void
) => {
  webSocketService.subscribe(`/sub/message/${chatRoomId}`, callback, true);
  console.log(`Subscribed to messages for room ${chatRoomId}`);
};

// 채팅 메시지 구독 취소
export const unsubscribeFromChatMessages = (chatRoomId: number) => {
  webSocketService.unsubscribe(`/sub/message/${chatRoomId}`);
  console.log(`Unsubscribed from messages for room ${chatRoomId}`);
};

// 채팅 내용 조회
export const fetchChatMessages = async (chatRoomId: number) => {
  try {
    const response = await axiosInstance.get(`/api/chat/${chatRoomId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch chat messages');
    }

    console.log(`Fetched messages for chat room ${chatRoomId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching messages for chat room ${chatRoomId}:`,
      error
    );
    throw error;
  }
};
