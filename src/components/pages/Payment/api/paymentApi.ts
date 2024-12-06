import axiosInstance from '../../../../api/axiosInstance';
export interface PaymentForm {
  url: string;
  productName: string;
  quantity: number;
  price: number;
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
    const URL = `/api/v1/main-payments?postId=${productId}`;
    const response = await axiosInstance.post(URL, payload);
    return response.data.checkoutPageUrl;
  } catch (error) {
    console.error(error);
    throw new Error('결제에 실패하였습니다.');
  }
};
