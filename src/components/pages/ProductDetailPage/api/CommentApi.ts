import axiosInstance from '../../../../api/axiosInstance';
export interface Review {
  review: string;
  rating: number;
}

export const addComment = async (productId: number, payload: Review) => {
  try {
    const URL = `goodbuyUs/product/${productId}`;
    const response = await axiosInstance.post(URL, payload);
    console.log(response);
    return response.data;
  } catch {
    throw new Error('댓글 작성에 실패하였습니다.');
  }
};

export const editComment = async (reviewId: number, payload: Review) => {
  try {
    const URL = `goodbuyUs/product/${reviewId}`;
    const response = await axiosInstance.put(URL, payload);
    console.log(response);
    return response.data;
  } catch {
    throw new Error('댓글 수정에 실패하였습니다.');
  }
};

export const deleteComment = async (reviewId: number) => {
  try {
    const URL = `goodbuyUs/remove/${reviewId}`;
    const response = await axiosInstance.put(URL);
    console.log(response);
    return response.data;
  } catch {
    throw new Error('댓글 삭제에 실패하였습니다.');
  }
};
