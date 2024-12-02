import axiosInstance from './axiosInstance';

export const postPasswordVerify = async (body: { currentPassword: string }) => {
  const response = await axiosInstance.post(`/mypage/verfiy`, body);

  return response.data;
};

export const postPasswordChange = async (body: { newPassword: string }) => {
  const response = await axiosInstance.post(`/mypage/change`, body);

  return response.data;
};
