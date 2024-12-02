import axiosInstance from '../../../../api/axiosInstance';
export interface PaymentForm {
  productName: string;
  url: string;
  price: number;
  quantity: number;
  payMethod: string;
  deliveryRequestDTO: UserForm;
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
    const URL = `goodbuyUs/orders/${productId}/payment`;
    const { data } = await axiosInstance.post(URL, payload);
    return data.data.paymentStatus;
  } catch {
    throw new Error('결제에 실패하였습니다.');
  }
};
