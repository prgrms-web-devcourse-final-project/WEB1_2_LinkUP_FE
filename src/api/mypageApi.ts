import axiosInstance from './axiosInstance';

export type OrderType = {
  delivery: null | string;
  orderDate: string;
  paymentStatus: string;
  payment_key: null | string;
  price: number;
  productName: string;
  quantity: number;
};

export const postPasswordVerify = async (body: { currentPassword: string }) => {
  const response = await axiosInstance.post(`/api/mypage/verify`, body);

  return response.data;
};

export const postPasswordChange = async (body: { newPassword: string }) => {
  const response = await axiosInstance.post(`/api/mypage/change`, body);

  return response.data;
};

export const putLocationChange = async (body: { newAddress: string }) => {
  const response = await axiosInstance.put(`/api/mypage/changeneighbor`, body);

  return response.data;
};

export const getOrderList = async () => {
  const response = await axiosInstance.get(`/api/mypage/orders`);

  if (response.status !== 204) {
    return response.data;
  } else {
    return [];
  }
};

export const getUser = async () => {
  const response = await axiosInstance.get(`/api/mypage`);

  return response.data;
};

export const getMyPost = async () => {
  const response = await axiosInstance.get(`/api/mypage/community`);

  return response.data;
};

export const deleteMyPost = async (id: string) => {
  const response = await axiosInstance.delete(`/api/mypage/post/${id}`);

  return response.data;
};
