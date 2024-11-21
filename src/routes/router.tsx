import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CommunityPage from '../components/pages/community/CommunityPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/community', // CommunityPage 경로
    element: <CommunityPage />,
    errorElement: <ErrorPage />,
  },
  { path: '*', element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
