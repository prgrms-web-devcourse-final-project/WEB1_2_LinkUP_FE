import axiosInstance from './axiosInstance';

export interface UserResponse {
  nickname: string;
  email: string;
  // 필요한 다른 사용자 정보 필드들...
}

export const getUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get('/api/user');
  return response.data;
};
