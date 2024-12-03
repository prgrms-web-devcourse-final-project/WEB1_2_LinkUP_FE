export const categories = [
  '식료품',
  '생활용품',
  '패션/의류',
  '전자제품',
  '가구/인테리어',
  '유아/아동용품',
  '스포츠',
];
export const popularProduct = {
  id: 16,
  name: '키친타올 세트',
  rating: 4,
  originalPrice: 12.0,
  discountPrice: 9.99,
  url: 'https://via.placeholder.com/200',
  category: '생활용품',
  description: '흡수력이 뛰어난 고품질 키친타올입니다.',
  minamount: 6,
  now: 12,
  currentStock: 20,
  deadline: '2024-12-08',
  reviews: [
    { review: '가성비 최고입니다.', rating: 4 },
    { review: '흡수력이 강해서 만족스럽습니다.', rating: 4 },
  ],
  available: false,
};

export const products = [
  {
    id: 1,
    name: 'LG 올레드 TV',
    rating: 5,
    originalPrice: 2500.0,
    discountPrice: 2199.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '선명한 화질을 제공하는 최신형 올레드 TV입니다.',
    minamount: 8,
    now: 12,
    currentStock: 20,
    deadline: '2024-12-31',
    reviews: [
      { review: '화질이 정말 선명하고 만족스럽습니다.', rating: 5 },
      { review: '디자인도 훌륭합니다.', rating: 5 },
    ],
    available: true,
  },
  {
    id: 2,
    name: '다이슨 무선 청소기',
    rating: 4.5,
    originalPrice: 500.0,
    discountPrice: 449.99,
    url: 'https://via.placeholder.com/200',
    category: '가전제품',
    description: '강력한 흡입력을 자랑하는 프리미엄 무선 청소기입니다.',
    minamount: 10,
    now: 15,
    currentStock: 20,
    deadline: '2024-12-15',
    reviews: [
      { review: '청소가 훨씬 쉬워졌습니다.', rating: 4 },
      { review: '흡입력이 강해서 만족합니다.', rating: 5 },
    ],
    available: false,
  },
  {
    id: 3,
    name: 'BOSE 스피커',
    rating: 5,
    originalPrice: 300.0,
    discountPrice: 249.99,
    url: 'https://via.placeholder.com/200',
    category: '음향기기',
    description: '뛰어난 음질을 제공하는 고급 블루투스 스피커입니다.',
    minamount: 9,
    now: 8,
    currentStock: 20,
    deadline: '2024-12-20',
    reviews: [
      { review: '음질이 놀랍도록 좋습니다.', rating: 5 },
      { review: '디자인도 세련되고 멋집니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 4,
    name: '나이키 에어포스',
    rating: 4.5,
    originalPrice: 150.0,
    discountPrice: 129.99,
    url: 'https://via.placeholder.com/200',
    category: '패션',
    description: '편안한 착용감을 제공하는 인기 운동화입니다.',
    minamount: 7,
    now: 14,
    currentStock: 20,
    deadline: '2024-11-28',
    reviews: [
      { review: '신발이 편안하고 스타일리시합니다.', rating: 5 },
      { review: '가성비가 좋습니다.', rating: 4 },
    ],
    available: false,
  },
  {
    id: 5,
    name: '스타벅스 머그컵',
    rating: 4,
    originalPrice: 30.0,
    discountPrice: 24.99,
    url: 'https://via.placeholder.com/200',
    category: '생활용품',
    description: '스타벅스 공식 디자인의 인기 머그컵입니다.',
    minamount: 6,
    now: 18,
    currentStock: 20,
    deadline: '2024-12-08',
    reviews: [
      { review: '디자인이 정말 예쁩니다.', rating: 4 },
      { review: '사용하기 편리합니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 6,
    name: '애플 에어팟',
    rating: 4.5,
    originalPrice: 200.0,
    discountPrice: 179.99,
    url: 'https://via.placeholder.com/200',
    category: '음향기기',
    description: '뛰어난 연결성과 음질을 자랑하는 무선 이어폰입니다.',
    minamount: 9,
    now: 10,
    currentStock: 20,
    deadline: '2024-12-12',
    reviews: [
      { review: '음질이 탁월하고 사용이 편리합니다.', rating: 5 },
      { review: '배터리 성능이 아쉽지만 만족합니다.', rating: 4 },
    ],
    available: false,
  },
  {
    id: 7,
    name: '소니 미러리스 카메라',
    rating: 5,
    originalPrice: 1200.0,
    discountPrice: 999.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '선명한 사진 촬영이 가능한 고성능 미러리스 카메라입니다.',
    minamount: 8,
    now: 11,
    currentStock: 20,
    deadline: '2024-11-28',
    reviews: [
      { review: '화질이 뛰어나서 만족스럽습니다.', rating: 5 },
      { review: '조작이 쉬워서 초보자에게도 추천합니다.', rating: 5 },
    ],
    available: true,
  },
  {
    id: 8,
    name: '아디다스 트레이닝복 세트',
    rating: 4.5,
    originalPrice: 120.0,
    discountPrice: 99.99,
    url: 'https://via.placeholder.com/200',
    category: '패션',
    description: '편안하고 활동적인 착용감을 제공하는 트레이닝복입니다.',
    minamount: 7,
    now: 13,
    currentStock: 20,
    deadline: '2024-12-09',
    reviews: [
      { review: '운동할 때 정말 편안합니다.', rating: 4 },
      { review: '디자인도 마음에 듭니다.', rating: 5 },
    ],
    available: false,
  },
  {
    id: 9,
    name: 'HP 게이밍 노트북',
    rating: 5,
    originalPrice: 1500.0,
    discountPrice: 1299.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '최고의 성능을 제공하는 고성능 게이밍 노트북입니다.',
    minamount: 12,
    now: 7,
    currentStock: 20,
    deadline: '2024-12-22',
    reviews: [
      { review: '게임 성능이 정말 탁월합니다.', rating: 5 },
      { review: '발열이 조금 있지만 만족합니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 10,
    name: '브리타 정수기',
    rating: 4,
    originalPrice: 100.0,
    discountPrice: 89.99,
    url: 'https://via.placeholder.com/200',
    category: '생활용품',
    description: '깨끗한 물을 제공하는 브리타 정수기입니다.',
    minamount: 5,
    now: 9,
    currentStock: 20,
    deadline: '2024-12-05',
    reviews: [
      { review: '물맛이 정말 좋아졌습니다.', rating: 5 },
      { review: '디자인도 깔끔하고 만족합니다.', rating: 4 },
    ],
    available: false,
  },
  {
    id: 11,
    name: '샤오미 로봇 청소기',
    rating: 5,
    originalPrice: 400.0,
    discountPrice: 349.99,
    url: 'https://via.placeholder.com/200',
    category: '생활용품',
    description: '자율 주행 기술이 탑재된 고성능 로봇 청소기입니다.',
    minamount: 9,
    now: 10,
    currentStock: 20,
    deadline: '2024-11-28',
    reviews: [
      { review: '청소가 훨씬 수월해졌어요!', rating: 5 },
      { review: '소음이 적어서 만족합니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 12,
    name: '삼성 냉장고',
    rating: 4.5,
    originalPrice: 1500.0,
    discountPrice: 1299.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '에너지 효율이 뛰어난 대용량 냉장고입니다.',
    minamount: 11,
    now: 7,
    currentStock: 20,
    deadline: '2024-12-28',
    reviews: [
      { review: '냉장 성능이 정말 좋아요.', rating: 5 },
      { review: '공간이 넉넉해서 편리합니다.', rating: 4 },
    ],
    available: false,
  },
  {
    id: 13,
    name: '맥북 프로',
    rating: 5,
    originalPrice: 2000.0,
    discountPrice: 1799.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '전문가용 고성능 노트북으로 최고의 성능을 제공합니다.',
    minamount: 10,
    now: 5,
    currentStock: 20,
    deadline: '2024-11-28',
    reviews: [
      { review: '디자인이 고급스럽고 성능이 대단해요.', rating: 5 },
      { review: '가격이 비싸지만 값어치를 합니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 14,
    name: '갤럭시 워치',
    rating: 4.5,
    originalPrice: 300.0,
    discountPrice: 249.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '운동과 건강 관리를 돕는 스마트워치입니다.',
    minamount: 8,
    now: 14,
    currentStock: 20,
    deadline: '2024-11-28',
    reviews: [
      { review: '운동할 때 정말 유용해요!', rating: 4 },
      { review: '디자인이 멋지고 배터리 성능이 훌륭합니다.', rating: 5 },
    ],
    available: false,
  },
  {
    id: 15,
    name: '필립스 에어프라이어',
    rating: 5,
    originalPrice: 180.0,
    discountPrice: 149.99,
    url: 'https://via.placeholder.com/200',
    category: '주방용품',
    description: '기름 없이도 맛있는 튀김 요리를 만들 수 있습니다.',
    minamount: 7,
    now: 16,
    currentStock: 20,
    deadline: '2024-12-20',
    reviews: [
      { review: '건강하게 요리할 수 있어서 좋아요.', rating: 5 },
      { review: '작동이 간편해서 자주 사용합니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 16,
    name: '키친타올 세트',
    rating: 4,
    originalPrice: 12.0,
    discountPrice: 9.99,
    url: 'https://via.placeholder.com/200',
    category: '생활용품',
    description: '흡수력이 뛰어난 고품질 키친타올입니다.',
    minamount: 6,
    now: 12,
    currentStock: 20,
    deadline: '2024-12-08',
    reviews: [
      { review: '가성비 최고입니다.', rating: 4 },
      { review: '흡수력이 강해서 만족스럽습니다.', rating: 4 },
    ],
    available: false,
  },
  {
    id: 17,
    name: '샤넬 No.5 향수',
    rating: 5,
    originalPrice: 120.0,
    discountPrice: 99.99,
    url: 'https://via.placeholder.com/200',
    category: '화장품',
    description: '우아하고 세련된 향을 지닌 고급 향수입니다.',
    minamount: 9,
    now: 10,
    currentStock: 20,
    deadline: '2024-11-28',
    reviews: [
      { review: '선물용으로 딱 좋아요.', rating: 5 },
      { review: '향이 오래 지속됩니다.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 18,
    name: '아이폰 15',
    rating: 5,
    originalPrice: 1200.0,
    discountPrice: 1099.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '최신 기술이 탑재된 고성능 스마트폰입니다.',
    minamount: 12,
    now: 8,
    currentStock: 20,
    deadline: '2024-12-29',
    reviews: [
      { review: '화면이 정말 선명해요.', rating: 5 },
      { review: '카메라가 최고입니다.', rating: 5 },
    ],
    available: false,
  },
  {
    id: 19,
    name: '아디다스 운동화',
    rating: 4.5,
    originalPrice: 150.0,
    discountPrice: 129.99,
    url: 'https://via.placeholder.com/200',
    category: '패션',
    description: '편안하고 스타일리시한 운동화입니다.',
    minamount: 7,
    now: 15,
    currentStock: 20,
    deadline: '2024-12-18',
    reviews: [
      { review: '착용감이 아주 편안합니다.', rating: 5 },
      { review: '오랜 시간 신어도 발이 아프지 않아요.', rating: 4 },
    ],
    available: true,
  },
  {
    id: 20,
    name: '소니 헤드폰',
    rating: 4.5,
    originalPrice: 400.0,
    discountPrice: 349.99,
    url: 'https://via.placeholder.com/200',
    category: '전자제품',
    description: '노이즈 캔슬링과 뛰어난 음질을 자랑하는 헤드폰입니다.',
    minamount: 10,
    now: 6,
    currentStock: 20,
    deadline: '2024-12-25',
    reviews: [
      { review: '음질이 정말 좋습니다.', rating: 5 },
      { review: '장시간 착용에도 편안합니다.', rating: 4 },
    ],
    available: false,
  },
];
