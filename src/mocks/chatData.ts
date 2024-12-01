const mockChatRooms = [
  {
    chatRoomId: 'room-1',
    chatRoomTitle:
      '생활용품 관련 공구 글 12 전원 결제 완료 채팅 테스트의 채팅방',
    participants: [
      {
        userId: 'user-00001',
        nickname: '사용자 A',
      },
      {
        userId: 'user-00002',
        nickname: '사용자 B',
      },
      {
        userId: 'user-00004',
        nickname: '사용자 D',
      },
    ],
    authorId: 'user-00001',
    postId: 'communityPost-00039',
    messages: [
      {
        senderId: 'user-00002',
        content: '안녕하세요! 공구 관련 문의드립니다.',
        timestamp: '2024-12-02T21:00:00',
      },
      {
        senderId: 'user-00001',
        content: '안녕하세요! 무엇이 궁금하신가요?',
        timestamp: '2024-12-02T21:01:00',
      },
      {
        senderId: 'user-00002',
        content: '혹시 물품 배분 위치는 어디가 될까요?',
        timestamp: '2024-12-02T21:02:00',
      },
      {
        senderId: 'user-00001',
        content: '"임의의 주소지"에서 배분할 예정입니다!',
        timestamp: '2024-12-02T21:03:00',
      },
      {
        senderId: 'user-00004',
        content: '"배분일과 배분시각은 어떻게 될까요?',
        timestamp: '2024-12-03T00:01:00',
      },
      {
        senderId: 'user-00001',
        content:
          '"임의의 날짜"에 배송이 완료될 예정이라 크게 변동이 없다면, 그 다음날 오후 8시쯤 어떠실까요?',
        timestamp: '2024-12-03T00:03:00',
      },
    ],
  },
];

export const mockFetchChatRoomDetails = (chatRoomId: string) => {
  const chatRoom = mockChatRooms.find((room) => room.chatRoomId === chatRoomId);
  if (!chatRoom) throw new Error('Chat room not found');

  const { participants, authorId, chatRoomTitle } = chatRoom;
  const authorNickname = participants.find(
    (participant) => participant.userId === authorId
  )?.nickname;

  if (!authorNickname) throw new Error('Author not found in participants.');

  return Promise.resolve({
    participants,
    authorNickname,
    chatRoomTitle,
  });
};

export const mockFetchChatMessages = (chatRoomId: string) => {
  const chatRoom = mockChatRooms.find((room) => room.chatRoomId === chatRoomId);
  if (!chatRoom) throw new Error('Chat room not found');
  return Promise.resolve(chatRoom.messages);
};

export const mockSendMessage = (
  chatRoomId: string,
  senderId: string,
  content: string
) => {
  const chatRoom = mockChatRooms.find((room) => room.chatRoomId === chatRoomId);
  if (!chatRoom) throw new Error('Chat room not found');

  const newMessage = {
    senderId,
    content,
    timestamp: new Date().toISOString(),
  };

  chatRoom.messages.push(newMessage);
  return Promise.resolve(newMessage);
};

export const mockDeleteChatRoom = (chatRoomId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const roomIndex = mockChatRooms.findIndex(
      (room) => room.chatRoomId === chatRoomId
    );

    if (roomIndex === -1) {
      reject(new Error('Chat room not found.'));
    } else {
      mockChatRooms.splice(roomIndex, 1); // 채팅방 삭제
      resolve();
    }
  });
};
