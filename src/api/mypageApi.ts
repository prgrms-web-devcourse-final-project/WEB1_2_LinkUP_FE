import axiosInstance from './axiosInstance';

export type OrderType = {
  productName: string;
  price: number;
  orderDate: string;
  paymentStatus: string;
  payment_key: null | string;
  quantity: number;
  delivery: null | string;
  postId: number;
  url: string;
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

export const getCommunity = async () => {
  const response = await axiosInstance.get(`/api/mypage/community`);

  return response.data;
};

export const getMyPostList = async () => {
  const response = await axiosInstance.get(`/api/mypage/post`);

  return response.data;
};

export const deleteMyPost = async (id: string) => {
  const response = await axiosInstance.delete(`/api/mypage/post/${id}`);

  return response.data;
};
