import axiosInstance from '../../../../api/axiosInstance';
export interface Review {
  review: string;
  rating: number;
}
export const addComment = async (productId: number, payload: Review) => {
  try {
    const URL = `/review/${productId}`;
    const { data } = await axiosInstance.post(URL, payload);
    return data;
  } catch {
    throw new Error('댓글 작성에 실패하였습니다.');
  }
};
