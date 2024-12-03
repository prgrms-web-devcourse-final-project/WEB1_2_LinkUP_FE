// import axiosInstance from '../../../../api/axiosInstance'; // 기존 Axios 인스턴스 사용
import {
  mockDeleteChatRoom,
  mockFetchChatMessages,
  mockFetchChatRoomDetails,
  mockSendMessage,
} from '../../../../mocks/chatData';

/**
 * 채팅방 세부 정보 조회
 * @param chatRoomId 채팅방 ID
 * @returns 채팅방 세부 정보 (참여자 정보, 작성자 닉네임, 채팅방 제목 포함)
 */

export const fetchChatRoomDetails = async (
  chatRoomId: string
): Promise<{
  chatRoomId: string;
  participants: { userId: string; nickname: string }[];
  authorNickname: string;
  chatRoomTitle: string;
}> => {
  try {
    // 실제 API 사용
    // const response = await axiosInstance.get(`/chat/${chatRoomId}`);
    // return {
    //   chatRoomId,
    //   participants: response.data.participants,
    //   authorNickname: response.data.authorNickname,
    //   chatRoomTitle: response.data.chatRoomTitle,
    // };

    // Mock 데이터 기반:
    return mockFetchChatRoomDetails(chatRoomId);
  } catch (error) {
    console.error('채팅방 정보 조회 오류:', error);
    throw new Error('채팅방 정보를 불러올 수 없습니다.');
  }
};

/**
 * 채팅 메시지 가져오기
 * @param chatRoomId 채팅방 ID
 * @returns 채팅 메시지 리스트
 */
export const fetchChatMessages = async (chatRoomId: string) => {
  try {
    // 실제 API 사용
    // const response = await axiosInstance.get(`/chat/${chatRoomId}/messages`);
    // return response.data;

    // Mock 데이터 기반:
    return mockFetchChatMessages(chatRoomId);
  } catch (error) {
    console.error('채팅 메시지 조회 오류:', error);
    throw new Error('채팅 메시지를 조회할 수 없습니다.');
  }
};

/**
 * 채팅 메시지 전송
 * @param chatRoomId 채팅방 ID
 * @param senderId 메시지 송신자 ID
 * @param content 메시지 내용
 */
export const sendMessage = async (
  chatRoomId: string,
  senderId: string,
  content: string
): Promise<void> => {
  try {
    // 실제 WebSocket 발행 메시지 전송
    // const message = { senderId, content };
    // socket.send(`/pub/message/${chatRoomId}`, JSON.stringify(message));

    // Mock API 사용
    await mockSendMessage(chatRoomId, senderId, content);
  } catch (error) {
    console.error('채팅 메시지 전송 오류:', error);
    throw new Error('채팅 메시지를 전송할 수 없습니다.');
  }
};

/**
 * 채팅방 삭제
 * @param chatRoomId 삭제할 채팅방 ID
 */
export const deleteChatRoom = async (chatRoomId: string): Promise<void> => {
  try {
    // 실제 API 사용
    // const response = await axiosInstance.delete(`/chat/${chatRoomId}`);
    // return response.data;

    // Mock 데이터 기반:
    await mockDeleteChatRoom(chatRoomId);
  } catch (error) {
    console.error('채팅방 삭제 오류:', error);
    throw new Error('채팅방을 삭제할 수 없습니다.');
  }
};
