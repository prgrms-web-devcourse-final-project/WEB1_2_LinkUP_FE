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
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsImV4cCI6MTczMzM4Mzk4MiwiZW1haWwiOiJ0ZXN0dGVzdEBuYXZlci5jb20ifQ.sU0fJXvxsdcoy0sp8R6KOQTC0V3uCH2QAywmGadQ0LtrRyiMd6Bz3zy-EhQ1cIAsAoJxd1hXA4kMPYtIhoQKeQ';
  //  localStorage.getItem('token'); // 토큰 저장 방식
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
