import axiosInstance from '../../../../api/axiosInstance'; // 기존 Axios 인스턴스 사용

// 결제 상태 타입 정의
export type PaymentStatus =
  | 'WAITNG_FOR_APPROVAL'
  | 'WAITNG_FOR_DEPOSIT'
  | 'DONE';

// 결제 요청 데이터 타입
export interface PaymentRequest {
  communityPostId: number;
  amount: number;
}

// 결제 응답 데이터 타입
export interface PaymentResponse {
  paymentId: string;
  status: PaymentStatus;
  paymentUrl?: string; // 결제 페이지로 리디렉션할 URL (필요한 경우)
  message?: string; // 성공 또는 실패 메시지
}

// 환불 요청 데이터 타입
export interface RefundRequest {
  paymentId: string;
  reason: string;
}

// 환불 응답 데이터 타입
export interface RefundResponse {
  refundId: string;
  status: PaymentStatus;
  message?: string; // 성공 또는 실패 메시지
}

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

// 결제 요청(가상 계좌 발급 용도)
export const requestPayment = async (
  communityPostId: number,
  paymentInfo: {
    recipientName: string;
    recipientAddress: string;
    deliveryRequest: string;
  }
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/virtual/${communityPostId}`,
      paymentInfo,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('결제 요청 중 오류:', error);
    throw error;
  }
};

// 결제 승인 요청
export const confirmPayment = async (
  paymentKey: string,
  paymentData: {
    amount: number;
    orderId: string;
  }
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/virtual/confirm-payment/${paymentKey}`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('결제 승인 요청 중 오류:', error);
    throw error;
  }
};

// 환불 요청
export const requestRefund = async (
  communityPostId: number,
  refundData: {
    paymentKey: string;
    cancelReason: string;
    refundReceiveAccount: {
      bank: string;
      accountNumber: string;
      holderName: string;
    };
  }
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/virtual/cancel-payment/${communityPostId}`,
      refundData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('환불 요청 중 오류:', error);
    throw error;
  }
};
