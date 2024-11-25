import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CategoryBasedPostsPage from '../components/pages/community/CategoryBasedPostsPage';
import PostCreatePage from '../components/pages/community/PostCreatePage';
import Layout from '../components/common/Layout';
import SignInPage from '../components/pages/login/SignInPage';
import SignUpPage from '../components/pages/login/SignUpPage';
import FindPasswordPage from '../components/pages/login/FindPasswordPage';
import ResetPasswordPage from '../components/pages/login/ResetPasswordPage';
import TermsPage from '../components/pages/login/TermsPage';
import ProductPage from '../components/pages/ProductPage/ProductPage';
import ProductDetail from '../components/pages/ProductDetailPage/ProductDetail';
import SetNicknamePage from '../components/pages/login/SetNicknamePage';
import SetProfilePage from '../components/pages/login/SetProfilePage';
import LoginCompletePage from '../components/pages/login/LoginCompletePage';

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
        element: <CategoryBasedPostsPage />,
      },
      {
        path: '/community/create',
        element: <PostCreatePage />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/findpassword', element: <FindPasswordPage /> },
  { path: '/resetpassword', element: <ResetPasswordPage /> },
  { path: '/termsandservice', element: <TermsPage /> },
  { path: '/setnickname', element: <SetNicknamePage /> },
  { path: '/setprofile', element: <SetProfilePage /> },
  { path: '/logincomplete', element: <LoginCompletePage /> },
  { path: '*', element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
