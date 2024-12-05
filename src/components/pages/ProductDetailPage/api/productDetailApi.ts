// import axios from 'axios';
import { Product } from '../../HomePage/model/productSchema';
import axiosInstance from '../../../../api/axiosInstance';

export const getProductbyId = async (post_id: number): Promise<Product> => {
  try {
    const URL = `/goodbuyUs/product?postid=${post_id}`;
    console.log(await axiosInstance.get(URL));    
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch {
    throw new Error('상품 정보를 가져오는 데 실패했습니다.');
  }
};