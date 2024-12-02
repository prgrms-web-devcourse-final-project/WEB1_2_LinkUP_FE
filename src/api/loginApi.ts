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

export const postFindPassword = async (body: { email: string }) => {
  const response = await axiosInstance.post(`/users/find`, body);

  return response.data;
};

export const postResetPassword = async (
  body: { newPassword: string },
  token: string
) => {
  const response = await axiosInstance.post(
    `/users/reset?token=${token}`,
    body
  );

  return response.data;
};
