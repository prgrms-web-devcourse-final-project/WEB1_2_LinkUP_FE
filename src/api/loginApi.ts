import axiosInstance from './axiosInstance';

export const postSignUp = async (body: {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  phone: string;
}) => {
  const response = await axiosInstance.post(`/users/checkemail`, body);

  return response.data;
};

export const postSignIn = async (body: { email: string; password: string }) => {
  const response = await axiosInstance.post(`/users/login`, body);

  return response.data;
};
