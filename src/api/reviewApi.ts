import axiosInstance from './axiosInstance';

interface reviewForm {
  reviewerId: number;
  hostId: number;
  question1Score: number | null;
  question2Score: number | null;
  question3Score: number | null;
  content: string;
}
export const reviewUser = async (payload: reviewForm) => {
  try {
    const URL = `/api/community/review`;
    const response = await axiosInstance.post(URL, payload);
    return response.data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
