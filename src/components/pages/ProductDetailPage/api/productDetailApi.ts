import axiosInstance from '../../../../api/axiosInstance';
export type Product = {
  id: string;
  name: string;
  stars: number;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  description: string;
};
export const getProductbyId = async (productId: string): Promise<Product> => {
  try {
    const URL = `/products/${productId}`;
    const { data } = await axiosInstance.get(URL);
    return data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
