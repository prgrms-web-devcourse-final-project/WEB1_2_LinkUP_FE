import axiosInstance from '../../../../api/axiosInstance';
export interface PaymentForm {
  productName: string;
  url: string;
  price: number;
  // amount: number;
  finalPrice: number;
  // postId: number;
  payMethod: string;
  needed: string;
  name: string;
  address: {
    city: string;
    detail: string;
  };
}
export const handlePayment = async (payload: PaymentForm) => {
  try {
    const URL = `/api/v1/payments`;
    const { data } = await axiosInstance.post(URL, payload);
    return data.data.paymentStatus;
  } catch {
    throw new Error('결제에 실패하였습니다.');
  }
};
