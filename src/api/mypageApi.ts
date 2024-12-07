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
  const response = await axiosInstance.post(`/mypage/verfiy`, body);

  return response.data;
};

export const postPasswordChange = async (body: { newPassword: string }) => {
  const response = await axiosInstance.post(`/mypage/change`, body);

  return response.data;
};

export const postLocationChange = async (body: { newAddress: string }) => {
  const response = await axiosInstance.post(`/mypage/changeneighbor`, body);

  return response.data;
};

export const getOrderList = async () => {
  const response = await axiosInstance.get(`/mypage/orders`);

  return response.data;
};
