import axiosInstance from '../../../../api/axiosInstance';
export type ProductSchema = {
  id: string;
};
export const addWishList = async (payload: ProductSchema) => {
  try {
    const URL = `/products/wishlist`;
    const { data } = await axiosInstance.post(URL, payload);
    return data;
  } catch {
    throw new Error('위시리스트 추가에 실패하였습니다.');
  }
};
