import axiosInstance from '../../../../api/axiosInstance';
import { Product } from '../../HomePage/model/productSchema';

export const getProductbyId = async (productId: number): Promise<Product> => {
  try {
    const URL = `/goodbuyUs/product?postid=${productId}`;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
