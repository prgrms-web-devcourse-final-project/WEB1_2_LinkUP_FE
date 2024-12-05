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

export const postSignUpLocation = async (body: { address: string }) => {
  const response = await axiosInstance.post(`/users/checkaddress`, body);

  return response.data;
};

export const postSignUpNickname = async (body: { nickname: string }) => {
  const response = await axiosInstance.post(`/users/checknickname`, body);

  return response.data;
};

export const postSignUpLast = async (profile: File | null) => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const password_confirm = localStorage.getItem('password_confirm');
  const name = localStorage.getItem('name');
  const phone = localStorage.getItem('phone');
  const nickname = localStorage.getItem('nickname');
  const address = localStorage.getItem('address');

  let profileBase64: string | null = null;
  if (profile) {
    profileBase64 = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(profile);
    });
  }

  const body = {
    email,
    password,
    password_confirm,
    name,
    phone,
    nickname,
    address,
    profile: profileBase64,
  };

  const response = await axiosInstance.post(`/users`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

export const postSignInSNS = async () => {
  const response = await axiosInstance.post(`/users/sociallogin`);

  return response.data;
};
