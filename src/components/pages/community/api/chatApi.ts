import axiosInstance from '../../../../api/axiosInstance';
import { webSocketService } from '../../../../utils/webSocket';

/**
 * 채팅방 생성
 * @param postId 게시물 ID
 * @returns 생성된 채팅방 정보
 */
export const createChatRoom = async (
  postId: number
): Promise<{
  id: number;
  roomName: string;
  createdAt: string | null;
  capacity: number;
}> => {
  try {
    const response = await axiosInstance.post('/chat', { postId });
    return response.data;
  } catch (error) {
    console.error('채팅방 생성 오류:', error);
    throw new Error('채팅방을 생성할 수 없습니다.');
  }
};

/**
 * 관리자 페이지 내 채팅방 목록 가져오기
 * @returns 채팅방 목록 배열
 */
export const fetchChatRooms = async (): Promise<
  {
    postId: number;
    capacity: number;
    roomName: string;
    chatMembers: string[];
  }[]
> => {
  try {
    // 실제 API 사용 시
    const response = await axiosInstance.get('/admin/chatlist');
    return response.data;
  } catch (error) {
    console.error('채팅방 목록 조회 오류:', error);
    throw new Error('채팅방 목록을 불러올 수 없습니다.');
  }
};

/**
 * 채팅 메시지 가져오기
 * @param id 채팅방 ID
 * @returns 채팅 메시지 리스트
 */
export const fetchChatMessages = async (id: number) => {
  try {
    // 실제 API 사용
    const response = await axiosInstance.get(`/chat/${id}/messages`);
    return response.data;
  } catch (error) {
    console.error('채팅 메시지 조회 오류:', error);
    throw new Error('채팅 메시지를 조회할 수 없습니다.');
  }
};

/**
 * 채팅 메시지 전송
 * @param id 채팅방 ID
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
    const message = { senderId, content };
    webSocketService.send(
      `/pub/message/${chatRoomId}`,
      JSON.stringify(message)
    );
  } catch (error) {
    console.error('채팅 메시지 전송 오류:', error);
    throw new Error('채팅 메시지를 전송할 수 없습니다.');
  }
};

/**
 * 채팅방 삭제
 * @param id 삭제할 채팅방 ID
 */
export const deleteChatRoom = async (id: number): Promise<void> => {
  try {
    // 실제 API 사용
    const response = await axiosInstance.delete(`/chat/${id}`);
    return response.data;
  } catch (error) {
    console.error('채팅방 삭제 오류:', error);
    throw new Error('채팅방을 삭제할 수 없습니다.');
  }
};
