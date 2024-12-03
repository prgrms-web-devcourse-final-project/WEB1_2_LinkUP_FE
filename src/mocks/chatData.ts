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
        timestamp: '2024-12-01T21:00:00',
      },
      {
        senderId: 'user-00001',
        content: '안녕하세요! 무엇이 궁금하신가요?',
        timestamp: '2024-12-01T21:01:00',
      },
      {
        senderId: 'user-00002',
        content: '혹시 물품 배분 위치는 어디가 될까요?',
        timestamp: '2024-12-01T21:02:00',
      },
      {
        senderId: 'user-00001',
        content: '"임의의 주소지"에서 배분할 예정입니다!',
        timestamp: '2024-12-01T21:03:00',
      },
      {
        senderId: 'user-00004',
        content: '"배분일과 배분시각은 어떻게 될까요?',
        timestamp: '2024-12-02T00:01:00',
      },
      {
        senderId: 'user-00001',
        content:
          '"임의의 날짜"에 배송이 완료될 예정이라 크게 변동이 없다면, 그 다음날 오후 8시쯤 어떠실까요?',
        timestamp: '2024-12-02T00:03:00',
      },
    ],
  },
  {
    chatRoomId: 'room-2',
    chatRoomTitle: '전자기기 공구 글 7 채팅 테스트방',
    participants: [
      { userId: 'user-00003', nickname: '사용자 C' },
      { userId: 'user-00005', nickname: '사용자 E' },
      { userId: 'user-00006', nickname: '사용자 F' },
    ],
    authorId: 'user-00003',
    postId: 'communityPost-00040',
    messages: [
      {
        senderId: 'user-00005',
        content: '이 공구 배송은 얼마나 걸릴까요?',
        timestamp: '2024-12-01T14:00:00',
      },
      {
        senderId: 'user-00003',
        content: '약 5~7일 정도 소요될 예정입니다.',
        timestamp: '2024-12-01T14:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-3',
    chatRoomTitle: '스포츠용품 공구 방',
    participants: [
      { userId: 'user-00007', nickname: '사용자 G' },
      { userId: 'user-00008', nickname: '사용자 H' },
      { userId: 'user-00009', nickname: '사용자 I' },
    ],
    authorId: 'user-00007',
    postId: 'communityPost-00041',
    messages: [
      {
        senderId: 'user-00008',
        content: '구매 시 추가 혜택이 있나요?',
        timestamp: '2024-12-01T10:00:00',
      },
      {
        senderId: 'user-00007',
        content: '지금 구매 시 무료 배송 혜택이 제공됩니다.',
        timestamp: '2024-12-01T10:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-4',
    chatRoomTitle: '유아용품 공동구매 채팅방',
    participants: [
      { userId: 'user-00010', nickname: '사용자 J' },
      { userId: 'user-00011', nickname: '사용자 K' },
      { userId: 'user-00012', nickname: '사용자 L' },
    ],
    authorId: 'user-00010',
    postId: 'communityPost-00042',
    messages: [
      {
        senderId: 'user-00011',
        content: '대략 언제까지 구매 확정하면 될까요?',
        timestamp: '2024-12-01T16:00:00',
      },
      {
        senderId: 'user-00010',
        content: '이번 주 금요일까지 확정해주시면 됩니다!',
        timestamp: '2024-12-01T16:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-5',
    chatRoomTitle: '생활가전 공구 구매자 채팅',
    participants: [
      { userId: 'user-00013', nickname: '사용자 M' },
      { userId: 'user-00014', nickname: '사용자 N' },
      { userId: 'user-00015', nickname: '사용자 O' },
    ],
    authorId: 'user-00013',
    postId: 'communityPost-00043',
    messages: [
      {
        senderId: 'user-00014',
        content: '결제는 어디서 진행하면 되나요?',
        timestamp: '2024-12-01T18:00:00',
      },
      {
        senderId: 'user-00013',
        content: '사이트 상단의 결제 버튼을 클릭하시면 됩니다.',
        timestamp: '2024-12-01T18:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-6',
    chatRoomTitle: '공구 테스트 채팅방',
    participants: [
      { userId: 'user-00016', nickname: '사용자 P' },
      { userId: 'user-00017', nickname: '사용자 Q' },
      { userId: 'user-00018', nickname: '사용자 R' },
    ],
    authorId: 'user-00016',
    postId: 'communityPost-00044',
    messages: [
      {
        senderId: 'user-00017',
        content: '배송일정이 어떻게 되나요?',
        timestamp: '2024-12-01T19:00:00',
      },
      {
        senderId: 'user-00016',
        content: '다음 주 월요일부터 배송이 시작됩니다.',
        timestamp: '2024-12-01T19:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-7',
    chatRoomTitle: '의류 공구 관련 채팅방',
    participants: [
      { userId: 'user-00019', nickname: '사용자 S' },
      { userId: 'user-00020', nickname: '사용자 T' },
      { userId: 'user-00021', nickname: '사용자 U' },
    ],
    authorId: 'user-00019',
    postId: 'communityPost-00045',
    messages: [
      {
        senderId: 'user-00020',
        content: '사이즈 정보는 어디서 확인할 수 있나요?',
        timestamp: '2024-12-03T09:00:00',
      },
      {
        senderId: 'user-00019',
        content: '게시글 하단에 상세 사이즈 표가 있습니다!',
        timestamp: '2024-12-03T09:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-8',
    chatRoomTitle: '주방용품 공구 채팅방',
    participants: [
      { userId: 'user-00022', nickname: '사용자 V' },
      { userId: 'user-00023', nickname: '사용자 W' },
      { userId: 'user-00024', nickname: '사용자 X' },
    ],
    authorId: 'user-00022',
    postId: 'communityPost-00046',
    messages: [
      {
        senderId: 'user-00024',
        content: '배송비는 별도인가요?',
        timestamp: '2024-12-03T11:00:00',
      },
      {
        senderId: 'user-00022',
        content: '10개 이상 구매 시 무료 배송입니다.',
        timestamp: '2024-12-03T11:02:00',
      },
    ],
  },
  {
    chatRoomId: 'room-9',
    chatRoomTitle: '화장품 공구 채팅 테스트방',
    participants: [
      { userId: 'user-00025', nickname: '사용자 Y' },
      { userId: 'user-00026', nickname: '사용자 Z' },
    ],
    authorId: 'user-00025',
    postId: 'communityPost-00047',
    messages: [
      {
        senderId: 'user-00026',
        content: '상품 유통기한은 언제까지인가요?',
        timestamp: '2024-12-03T15:00:00',
      },
      {
        senderId: 'user-00025',
        content: '2025년 6월까지 사용 가능합니다.',
        timestamp: '2024-12-03T15:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-10',
    chatRoomTitle: '책 공구 방',
    participants: [
      { userId: 'user-00027', nickname: '사용자 AA' },
      { userId: 'user-00028', nickname: '사용자 BB' },
      { userId: 'user-00029', nickname: '사용자 CC' },
    ],
    authorId: 'user-00027',
    postId: 'communityPost-00048',
    messages: [
      {
        senderId: 'user-00028',
        content: '배송 전에 책 상태를 확인할 수 있나요?',
        timestamp: '2024-12-03T17:00:00',
      },
      {
        senderId: 'user-00027',
        content: '구매 확정 후 3일 내 배송 전 샘플 이미지를 보내드립니다.',
        timestamp: '2024-12-03T17:02:00',
      },
    ],
  },
  {
    chatRoomId: 'room-11',
    chatRoomTitle: '캠핑용품 공구 방',
    participants: [
      { userId: 'user-00030', nickname: '사용자 DD' },
      { userId: 'user-00031', nickname: '사용자 EE' },
    ],
    authorId: 'user-00030',
    postId: 'communityPost-00049',
    messages: [
      {
        senderId: 'user-00031',
        content: '이 텐트는 몇 인용인가요?',
        timestamp: '2024-12-03T19:00:00',
      },
      {
        senderId: 'user-00030',
        content: '최대 4인용으로 사용할 수 있습니다.',
        timestamp: '2024-12-03T19:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-12',
    chatRoomTitle: '헬스용품 공동구매 방',
    participants: [
      { userId: 'user-00032', nickname: '사용자 FF' },
      { userId: 'user-00033', nickname: '사용자 GG' },
      { userId: 'user-00034', nickname: '사용자 HH' },
    ],
    authorId: 'user-00032',
    postId: 'communityPost-00050',
    messages: [
      {
        senderId: 'user-00034',
        content: '상품 AS는 가능한가요?',
        timestamp: '2024-12-03T21:00:00',
      },
      {
        senderId: 'user-00032',
        content: '보증 기간 1년 내 AS가 가능합니다.',
        timestamp: '2024-12-03T21:02:00',
      },
    ],
  },
  {
    chatRoomId: 'room-13',
    chatRoomTitle: '음료 공구 채팅방',
    participants: [
      { userId: 'user-00035', nickname: '사용자 II' },
      { userId: 'user-00036', nickname: '사용자 JJ' },
    ],
    authorId: 'user-00035',
    postId: 'communityPost-00051',
    messages: [
      {
        senderId: 'user-00036',
        content: '박스당 몇 병인가요?',
        timestamp: '2024-12-03T22:00:00',
      },
      {
        senderId: 'user-00035',
        content: '한 박스에 24병이 포함되어 있습니다.',
        timestamp: '2024-12-03T22:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-14',
    chatRoomTitle: '홈데코 공동구매 채팅',
    participants: [
      { userId: 'user-00037', nickname: '사용자 KK' },
      { userId: 'user-00038', nickname: '사용자 LL' },
    ],
    authorId: 'user-00037',
    postId: 'communityPost-00052',
    messages: [
      {
        senderId: 'user-00038',
        content: '특정 색상을 지정할 수 있나요?',
        timestamp: '2024-12-03T23:00:00',
      },
      {
        senderId: 'user-00037',
        content: '주문 시 비고란에 색상 요청을 적어주세요!',
        timestamp: '2024-12-03T23:01:00',
      },
    ],
  },
  {
    chatRoomId: 'room-15',
    chatRoomTitle: '문구류 공구 테스트 채팅',
    participants: [
      { userId: 'user-00039', nickname: '사용자 MM' },
      { userId: 'user-00040', nickname: '사용자 NN' },
    ],
    authorId: 'user-00039',
    postId: 'communityPost-00053',
    messages: [
      {
        senderId: 'user-00040',
        content: '세트 구성은 어떻게 되나요?',
        timestamp: '2024-12-04T01:00:00',
      },
      {
        senderId: 'user-00039',
        content: '펜 5개, 노트 3권이 포함되어 있습니다.',
        timestamp: '2024-12-04T01:02:00',
      },
    ],
  },
  {
    chatRoomId: 'room-16',
    chatRoomTitle: '수제 간식 공구 채팅방',
    participants: [
      { userId: 'user-00041', nickname: '사용자 OO' },
      { userId: 'user-00042', nickname: '사용자 PP' },
    ],
    authorId: 'user-00041',
    postId: 'communityPost-00054',
    messages: [
      {
        senderId: 'user-00042',
        content: '유통기한은 얼마나 되나요?',
        timestamp: '2024-12-04T03:00:00',
      },
      {
        senderId: 'user-00041',
        content: '제조일로부터 2주간 신선하게 유지됩니다.',
        timestamp: '2024-12-04T03:01:00',
      },
    ],
  },
];

export const mockFetchChatRooms = async (): Promise<
  {
    chatRoomId: string;
    chatRoomTitle: string;
    participants: { userId: string; nickname: string }[];
  }[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockChatRooms.map((room) => ({
    chatRoomId: room.chatRoomId,
    chatRoomTitle: room.chatRoomTitle,
    participants: room.participants,
  }));
};

export const mockFetchChatRoomDetails = (chatRoomId: string) => {
  const chatRoom = mockChatRooms.find((room) => room.chatRoomId === chatRoomId);
  if (!chatRoom) throw new Error('Chat room not found');

  const { participants, authorId, chatRoomTitle } = chatRoom;
  const authorNickname = participants.find(
    (participant) => participant.userId === authorId
  )?.nickname;

  if (!authorNickname) throw new Error('Author not found in participants.');

  return Promise.resolve({
    chatRoomId,
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
