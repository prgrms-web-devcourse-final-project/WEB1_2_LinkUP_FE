import axiosInstance from './axiosInstance';

export type RefundType = {
  productName: string;
  quantity: number;
  price: number;
  url: string;
  paymentStatus: string;
  postId: number;
};

export type MyPostType = {
  availableNumber: number;
  category: string;
  closeAt: null;
  communityPostId: number;
  createdAt: string;
  description: string;
  imageUrls: string[];
  nickname: string;
  paymentDeadline: null;
  period: number;
  productUrl: string;
  status: string;
  title: string;
  totalAmount: number;
  unitAmount: number;
  userId: number;
};

export type GroupPurchaseType = {
  communityPostId: number;
  title: string;
  totalAmount: number;
  description: string;
  productUrl: string;
  category: string;
  availableNumber: number;
  createdAt: string;
  period: number;
  closeAt: null;
  unitAmount: number;
  imageUrls: string[];
  status: string;
  userId: number;
  nickname: string;
  paymentDeadline: null;
};

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

export const getRefundList = async () => {
  const response = await axiosInstance.get(`/api/mypage/refund_orders`);

  return response.data;
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

export const postProductCancel = async (body: {
  paymentKey: string;
  cancelReason: string;
}) => {
  const response = await axiosInstance.post(
    `/api/v1/main-payments/cancel`,
    body
  );

  return response.data;
};

export const putEditProfile = async (formData: FormData) => {
  const response = await axiosInstance.put(
    '/api/mypage/editprofile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const putChangeNickname = async (nickname: string) => {
  const response = await axiosInstance.put(
    `/api/mypage/change_nickname?nickName=${nickname}`
  );

  return response.data;
};
