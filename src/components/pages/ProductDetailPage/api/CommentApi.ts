import axiosInstance from '../../../../api/axiosInstance';
export type Comment = {
  comment: string;
  star: number;
};
export const addComment = async (payload: Comment) => {
  try {
    const URL = `/products/comment`;
    const { data } = await axiosInstance.post(URL, payload);
    return data;
  } catch {
    throw new Error('댓글 작성에 실패하였습니다.');
  }
};
