import axiosInstance from '../../../api/axiosInstance';
export type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  bannerImage: string;
};
export const fetchUser = async (): Promise<User> => {
  try {
    const URL = `/users/me`;

    const { data } = await axiosInstance.get(URL);

    return data.payload;
  } catch {
    throw new Error('유저 정보를 가져오는 데 실패했습니다.');
  }
};
