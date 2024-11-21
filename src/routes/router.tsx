import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CommunityPage from '../components/pages/community/CommunityPage';
import Layout from '../components/common/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/community',
        element: <CommunityPage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
