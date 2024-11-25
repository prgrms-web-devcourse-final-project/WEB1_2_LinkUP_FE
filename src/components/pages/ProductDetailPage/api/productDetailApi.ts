import axiosInstance from '../../../../api/axiosInstance';
import { Product } from '../../HomePage/model/productSchema';

export const getProductbyId = async (productId: string): Promise<Product> => {
  try {
    const URL = `/products/${productId}`;
    const { data } = await axiosInstance.get(URL);
    return data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
