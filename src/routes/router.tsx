import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CommunityPage from '../components/pages/community/CommunityPage';
import Layout from '../components/common/Layout';
import SignInPage from '../components/pages/login/SignInPage';
import SignUpPage from '../components/pages/login/SignUpPage';
import FindPasswordPage from '../components/pages/login/FindPasswordPage';
import ResetPasswordPage from '../components/pages/login/ResetPasswordPage';
import TermsPage from '../components/pages/login/TermsPage';
import ProductPage from '../components/pages/ProductPage/ProductPage';
import ProductDetail from '../components/pages/ProductDetailPage/ProductDetail';
import SettingPage from '../components/pages/myPage/SettingPage';
import OrderListPage from '../components/pages/myPage/OrderListPage';
import WishListPage from '../components/pages/myPage/WishListPage';
import LocationPage from '../components/pages/myPage/LocationPage';
import RefundPage from '../components/pages/myPage/RefundPage';
import NotificationPage from '../components/pages/myPage/NotificationPage';
import MyPostsPage from '../components/pages/myPage/MyPostsPage';
import ChatListPage from '../components/pages/myPage/ChatListPage';

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
      {
        path: '/mypage',
        children: [
          {
            path: 'setting',
            element: <SettingPage />,
          },
          {
            path: 'orderlist',
            element: <OrderListPage />,
          },
          {
            path: 'wishlist',
            element: <WishListPage />,
          },
          {
            path: 'location',
            element: <LocationPage />,
          },
          {
            path: 'refund',
            element: <RefundPage />,
          },
          {
            path: 'notification',
            element: <NotificationPage />,
          },
          {
            path: 'myposts',
            element: <MyPostsPage />,
          },
          {
            path: 'chatlist',
            element: <ChatListPage />,
          },
        ],
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
  { path: '*', element: <NotFoundPage /> }, // 404 페이지
]);

export default router;
