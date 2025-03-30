import axiosInstance from '../../../../api/axiosInstance';
import { AllProducts, WishProducts } from '../model/productSchema';

export const getProducts = async (): Promise<AllProducts[]> => {
  try {
    const URL = `/api/goodbuyUs`;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};

export const getWishProducts = async (): Promise<WishProducts[]> => {
  try {
    const URL = `/api/v1/wish`;
    const response = await axiosInstance.get(URL);

    return response.data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
