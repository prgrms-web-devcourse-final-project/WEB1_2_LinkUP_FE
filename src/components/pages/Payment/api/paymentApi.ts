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
export const handlePayment = async (): Promise<Product[]> => {
  try {
    const URL = `/payment`;
    const { data } = await axiosInstance.post(URL);
    return data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
