import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';

interface reviewForm {
  reviewerId: number;
  hostId: number;
  question1Score: number | null;
  question2Score: number | null;
  question3Score: number | null;
  content: string;
}

export interface ReviewType {
  userId: number;
  rating: number;
  reviews: {
    reviewerId: number;
    nickname: string;
    reviewContent: string;
  }[];
}

export const reviewUser = async (payload: reviewForm) => {
  try {
    const URL = `/api/community/review`;
    const response = await axiosInstance.post(URL, payload);
    return response.data;
  } catch (error: unknown) {
    if (
      error instanceof AxiosError &&
      error.response?.data?.error ===
        '이미 이 사용자에 대한 리뷰를 작성하였습니다.'
    ) {
      alert('이미 리뷰를 작성하셨습니다.');
    } else {
      alert('리뷰 제출에 실패했습니다. 다시 시도해주세요.');
    }
    throw error;
  }
};

export const getMyReviews = async (userId: number): Promise<ReviewType> => {
  try {
    const URL = `/api/mypage/${userId}/reviews`;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch (error) {
    console.error('리뷰를 불러오는데 실패했습니다.', error);
    throw error;
  }
};
