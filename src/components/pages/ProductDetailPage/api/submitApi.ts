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
    const URL = `/api/v1/orders?postId=${productId}`;
    const response = await axiosInstance.post(URL, { amount });
    return response.data;
  } catch {
    throw new Error('주문에 실패하였습니다.');
  }
};
