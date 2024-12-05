import axiosInstance from '../../../../api/axiosInstance';

export interface SubmitResponse {
  url: string;
  productName: string;
  price: number;
  amount: number;
  finalPrice: number;
  postId: number;
}

export const submitOrder = async (
  productId: number,
  amount: number
): Promise<SubmitResponse> => {
  try {
    const URL = `/goodbuyUs/orders/${productId}`;
    const response = await axiosInstance.post(URL, { amount });
    console.log(response);
    return response.data;
  } catch {
    throw new Error('주문에 실패하였습니다.');
  }
};
