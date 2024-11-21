import axiosInstance from '../../../../api/axiosInstance';
export type Product = {
  id: string;
  name: string;
  likes: string;
  Image: string;
  price: string;
  category: string;
};
export const getProducts = async (): Promise<Product> => {
  try {
    const URL = `/products`;

    const { data } = await axiosInstance.get(URL);

    return data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};
