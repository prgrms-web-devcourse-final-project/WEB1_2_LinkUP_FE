import axiosInstance from './axiosInstance';

export const postSignUp = async (body: {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  phone: string;
}) => {
  const response = await axiosInstance.post(`/api/users/checkemail`, body);

  return response.data;
};

export const postSignUpLocation = async (body: { address: string }) => {
  const response = await axiosInstance.post(`/api/users/checkaddress`, body);

  return response.data;
};

export const postSignUpNickname = async (body: { nickname: string }) => {
  const response = await axiosInstance.post(`/api/users/checknickname`, body);

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

  const user = {
    email,
    password,
    password_confirm,
    name,
    phone,
    nickname,
    address,
  };

  const formData = new FormData();
  formData.append(
    'user',
    new Blob([JSON.stringify(user)], { type: 'application/json' })
  );

  if (profile) {
    formData.append('profile', profile);
  } else {
    const defaultImageUrl = '/public/images/origin.png';

    const defaultImageBlob = await fetch(defaultImageUrl).then((res) =>
      res.blob()
    );
    const defaultImageFile = new File([defaultImageBlob], 'origin.png', {
      type: defaultImageBlob.type,
    });

    formData.append('profile', defaultImageFile);
  }

  const response = await axiosInstance.post(`/api/users`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const postSignIn = async (body: { email: string; password: string }) => {
  const response = await axiosInstance.post(`/api/users/login`, body);
  const token =
    response.headers['authorization'] || response.headers['Authorization'];
  const role = response.data.roles;
  const userId = response.data.userid;

  if (token) {
    sessionStorage.setItem('token', token);
    localStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userid', userId);
  }

  return response;
};

export const postFindPassword = async (body: { email: string }) => {
  const response = await axiosInstance.post(`/api/users/find`, body);

  return response.data;
};

export const postResetPassword = async (
  body: { newPassword: string },
  token: string
) => {
  const response = await axiosInstance.post(
    `/api/users/reset?token=${token}`,
    body
  );

  return response.data;
};

export const postSignInSNS = async () => {
  const response = await axiosInstance.post(`/api/users/sociallogin`);

  return response.data;
};
