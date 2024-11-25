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
export const addWishList = async (payload: Product) => {
  try {
    const URL = `/products/wishlist`;
    const { data } = await axiosInstance.post(URL, payload);
    return data;
  } catch {
    throw new Error('위시리스트 추가에 실패하였습니다.');
  }
};
