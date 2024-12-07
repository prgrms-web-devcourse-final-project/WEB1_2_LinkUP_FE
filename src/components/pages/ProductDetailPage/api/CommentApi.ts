import axiosInstance from '../../../../api/axiosInstance';
export interface Review {
  content: string;
  rate: number;
}

export const addComment = async (productId: number, payload: Review) => {
  const URL = `api/review/${productId}`;
  await axiosInstance.post(URL, payload);
};

export const editComment = async (reviewId: number, payload: Review) => {
  const URL = `api/review/update/${reviewId}`;
  await axiosInstance.put(URL, payload);
};

export const deleteComment = async (reviewId: number) => {
  const URL = `api/review/remove/${reviewId}`;
  await axiosInstance.put(URL);
};
