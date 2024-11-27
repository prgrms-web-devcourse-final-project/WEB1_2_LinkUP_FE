import axiosInstance from '../../../../api/axiosInstance';
export type Product = {
  id: string;
  name: string;
  stars: number;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  category: string;
};
export const handlePayment = async (): Promise<boolean> => {
  try {
    const URL = `/payment`;
    const { data } = await axiosInstance.post(URL);
    return data;
  } catch {
    throw new Error('결제에 실패하였습니다.');
  }
};
