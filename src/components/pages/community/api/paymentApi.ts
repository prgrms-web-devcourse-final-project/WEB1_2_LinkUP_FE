import axiosInstance from '../../../../api/axiosInstance'; // 기존 Axios 인스턴스 사용

/**
 * 가상계좌 발급 API 호출
 * @param customerName 고객 이름
 * @param customerEmail 고객 이메일
 * @param amount 결제 금액
 * @param orderId 주문 ID
 * @param orderName 주문 이름
 * @param bank 선택 은행
 * @returns 발급된 가상계좌 정보
 */
export const requestVirtualAccount = async ({
  customerName,
  customerEmail,
  amount,
  orderId,
  orderName,
  bank = '국민은행', // 기본 은행 설정
}: {
  customerName: string;
  customerEmail: string;
  amount: number;
  orderId: string;
  orderName: string;
  bank?: string;
}): Promise<string> => {
  try {
    const response = await axiosInstance.post(
      '/api/toss-payments/virtual-account',
      {
        customerName,
        customerEmail,
        amount,
        orderId,
        orderName,
        bank,
      }
    );

    return response.data.virtualAccount; // 발급된 가상계좌 반환
  } catch (error) {
    console.error('가상계좌 발급 실패:', error);
    throw new Error('가상계좌 발급에 실패했습니다.');
  }
};
