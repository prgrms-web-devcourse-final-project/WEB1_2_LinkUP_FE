import axiosInstance from '../../../../api/axiosInstance';

export interface PostId {
  productPostId: number;
}

export const postWishProduct = async (payload: PostId) => {
  try {
    const URL = `/api/v1/wish/add`;
    const response = await axiosInstance.post(URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch {
    throw new Error('상품을 찜하는 데 실패했습니다.');
  }
};
