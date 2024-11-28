import axiosInstance from '../../../../api/axiosInstance';

export interface SubmitForm {
  url: string;
  productName: string;
  price: number;
  discountPrice: number;
  amount: number;
}

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
  payload: SubmitForm
): Promise<SubmitResponse> => {
  try {
    const URL = `/homepage/order/${productId}`;
    const { data } = await axiosInstance.post(URL, payload);
    return data;
  } catch {
    throw new Error('주문에 실패하였습니다.');
  }
};
