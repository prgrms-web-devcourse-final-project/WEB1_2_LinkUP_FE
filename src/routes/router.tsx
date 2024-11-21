import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CategoryBasedPostsPage from '../components/pages/community/CategoryBasedPostsPage';
import PostCreatePage from '../components/pages/community/PostCreatePage';
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
        element: <CategoryBasedPostsPage />,
      },
      {
        path: '/community/create',
        element: <PostCreatePage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
