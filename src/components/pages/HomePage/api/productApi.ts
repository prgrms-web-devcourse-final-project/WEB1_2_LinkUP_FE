import axiosInstance from '../../../../api/axiosInstance';
import { Product } from '../model/productSchema';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const URL = `/goodbuyUs`;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
