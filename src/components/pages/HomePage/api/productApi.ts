import axiosInstance from '../../../../api/axiosInstance';
import { Product } from '../model/productSchema';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const URL = `/homepage`;
    const { data } = await axiosInstance.get(URL);
    return data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
