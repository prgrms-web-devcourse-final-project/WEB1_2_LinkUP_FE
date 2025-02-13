import axiosInstance from '../../../../api/axiosInstance';
export interface PaymentForm {
  url: string;
  productName: string;
  quantity: number;
  price: number;
  payMethod: string;
  deliveryRequestDTO: UserForm;
}

export interface CommnunityPaymentForm {
  recipientName: string;
  recipientAddress: string;
  deliveryRequest: string;
}

export interface RefundForm {
  paymentKey: string;
  cancelReason: string;
  refundReceiveAccount: {
    bank: string;
    accountNumber: string;
    holderName: string;
  };
}

export interface UserForm {
  name: string;
  address: {
    street: string;
    detail: string;
  };
  needed: string;
}

export const handlePayment = async (
  productId: number,
  payload: PaymentForm
) => {
  try {
    const URL = `/api/v1/main-payments?postId=${productId}`;
    const response = await axiosInstance.post(URL, payload);
    return response.data.checkoutPageUrl;
  } catch {
    throw new Error('결제에 실패하였습니다.');
  }
};

export const handleCommunityPayment = async (
  postId: number,
  payload: CommnunityPaymentForm
) => {
  try {
    const URL = `/api/v1/virtual/${postId}`;
    const response = await axiosInstance.post(URL, payload);
    return response.data.checkoutPageUrl;
  } catch {
    throw new Error('결제에 실패하였습니다.');
  }
};

// 환불 요청
export const handleRefund = async (postId: number, payload: RefundForm) => {
  const URL = `/api/v1/virtual/cancel-payment/${postId}`;
  const response = await axiosInstance.post(URL, payload);
  console.log(response.data);
  return response.data;
};
