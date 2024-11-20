import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchUser, User } from './api/userApi';

const HomePage: React.FC = () => {
  // const { data, isLoading, error } = useQuery<User>({
  //   queryKey: ['user'],
  //   queryFn: () => fetchUser(),
  // });

  // // 로딩 상태 처리
  // if (isLoading) return <div>Loading...</div>;

  // // 에러 상태 처리
  // if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Home</h1>
      <div>
        {/* <p>ID: {data?.id}</p>
        <p>Name: {data?.name}</p> */}
      </div>
    </div>
  );
};

export default HomePage;
