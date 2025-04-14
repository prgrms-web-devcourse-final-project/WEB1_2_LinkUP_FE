import axiosInstance from '../../../../api/axiosInstance';
export interface Review {
  content: string;
  rate: number;
}

export const addComment = async (productId: number, payload: Review) => {
  const URL = `/api/review/${productId}`;
  const response = await axiosInstance.post(URL, payload);
  return response;
};

export const editComment = async (reviewId: number, payload: Review) => {
  const URL = `/api/review/update/${reviewId}`;
  const response = await axiosInstance.put(URL, payload);

  return response;
};

export const deleteComment = async (reviewId: number) => {
  const URL = `/api/review/remove/${reviewId}`;
  const response = await axiosInstance.put(URL);
  return response;
};

export const getComments = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`/api/comments/${productId}`);
    return response.data;
  } catch (error) {
    console.error('failed', error);
  }
};
