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
export interface VirtualAccountResponse {
  paymentKey: string;
  orderId: string;
  status: string;
  totalAmount: string;
  checkoutPageUrl: string;
  virtualAccount: {
    accountNumber: string;
    bankCode: string;
    customerName: string;
  } | null;
}

// 결제 상태 확인 API
export const fetchPaymentStatus = async (paymentKey: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/virtual/update-payment/${paymentKey}`
    );
    return response.data;
  } catch (error) {
    console.error('결제 상태 확인 실패:', error);
    throw new Error('결제 상태 확인에 실패했습니다.');
  }
};
