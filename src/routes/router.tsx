import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CommunityPage from '../components/pages/community/CommunityPage';
import Layout from '../components/common/Layout';
import ProductPage from '../components/pages/ProductPage/ProductPage';
import ProductDetail from '../components/pages/ProductDetailPage/ProductDetail';

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
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
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
