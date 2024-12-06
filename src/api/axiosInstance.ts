import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API URL
  timeout: 5000, // 요청 제한 시간 (ms)
  headers: {
    'Content-Type': 'application/json', // JSON 형식 사용
  },
});

// 요청/응답 인터셉터 설정 (선택 사항)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 토큰 저장 방식
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
