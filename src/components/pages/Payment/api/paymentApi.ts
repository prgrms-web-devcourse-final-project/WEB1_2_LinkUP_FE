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
    const response = await axiosInstance.post(URL, payload);
    console.log(response);
    return response.data;
  } catch {
    throw new Error('결제에 실패하였습니다.');
  }
};
