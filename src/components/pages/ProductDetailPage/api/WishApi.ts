import axiosInstance from '../../../../api/axiosInstance';

export const addWishList = async (productId: number) => {
  try {
    const URL = `/products/wishlist`;
    const { data } = await axiosInstance.post(URL, productId);
    return data;
  } catch {
    throw new Error('위시리스트 추가에 실패하였습니다.');
  }
};
