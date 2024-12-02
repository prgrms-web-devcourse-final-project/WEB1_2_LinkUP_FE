import axiosInstance from './axiosInstance';

export const postSignUp = async (body: {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  name: string;
  phone: string;
  profile: File;
  address: string;
}) => {
  const response = await axiosInstance.post(`/users`, body);

  return response.data;
};

export const postSignIn = async (body: { email: string; password: string }) => {
  const response = await axiosInstance.post(`/users/login`, body);

  return response.data;
};
