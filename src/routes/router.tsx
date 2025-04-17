import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import HomePage from '../components/pages/HomePage/HomePage';
import CategoryBasedPostsPage from '../components/pages/community/CategoryBasedPostsPage';
import PostCreatePage from '../components/pages/community/PostCreatePage';
import PostDetailPage from '../components/pages/community/PostDetailPage';
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
import SetNicknamePage from '../components/pages/login/SetNicknamePage';
import SetProfilePage from '../components/pages/login/SetProfilePage';
import LoginCompletePage from '../components/pages/login/LoginCompletePage';
import PaymentForm from '../components/pages/Payment/PaymentForm';
import ScrollToTop from '../components/common/ScrollToTop';
import PostEditPage from '../components/pages/community/PostEditPage';
import SetLocationPage from '../components/pages/login/SetLocationPage';
import PaymentCompletePage from '../components/pages/Payment/PaymentCompletePage';
import PostManagementPage from '../components/pages/admin/PostManagementPage';
import PostApprovalPage from '../components/pages/admin/PostApprovalPage';
import PaymentFailPage from '../components/pages/Payment/PaymentFailPage';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import ProtectedRoutes from './ProtectedRoutes';
import ParticipantsForm from '../components/pages/Payment/ParticipantsForm';
import AuthorForm from '../components/pages/Payment/AuthorForm';
import PaymentSuccessPage from '../components/pages/Payment/PaymentSuccessPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Layout />
          <ScrollToTop />
          <ScrollToTopButton />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/products',
          element: (
            <ProtectedRoutes>
              <ProductPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/products/:id',
          element: (
            <ProtectedRoutes>
              <ProductDetail />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/products/payment/:id',
          element: (
            <ProtectedRoutes>
              <PaymentForm />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/products/payment-success/:id',
          element: (
            <ProtectedRoutes>
              <PaymentSuccessPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/products/payment-fail/:id',
          element: (
            <ProtectedRoutes>
              <PaymentFailPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/post',
          element: (
            <ProtectedRoutes>
              <CategoryBasedPostsPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/post/create',
          element: (
            <ProtectedRoutes>
              <PostCreatePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/post/:communityPostId',
          element: (
            <ProtectedRoutes>
              <PostDetailPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/post/:communityPostId/edit',
          element: (
            <ProtectedRoutes>
              <PostEditPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/post/:id/payment/author',
          element: (
            <ProtectedRoutes>
              <AuthorForm />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/post/:id/payment/participant',
          element: (
            <ProtectedRoutes>
              <ParticipantsForm />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/community/success/:id',
          element: (
            <ProtectedRoutes>
              <PaymentCompletePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/admin/post',
          element: (
            <ProtectedRoutes>
              <PostManagementPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/admin/post/approval/:communityPostId',
          element: (
            <ProtectedRoutes>
              <PostApprovalPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/mypage',
          children: [
            {
              path: 'setting',
              element: (
                <ProtectedRoutes>
                  <SettingPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'orderlist',
              element: (
                <ProtectedRoutes>
                  <OrderListPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'wishlist',
              element: (
                <ProtectedRoutes>
                  <WishListPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'location',
              element: (
                <ProtectedRoutes>
                  <LocationPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'refund',
              element: (
                <ProtectedRoutes>
                  <RefundPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'notification',
              element: (
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'myposts',
              element: (
                <ProtectedRoutes>
                  <MyPostsPage />
                </ProtectedRoutes>
              ),
            },
            {
              path: 'chatlist',
              element: (
                <ProtectedRoutes>
                  <ChatListPage />
                </ProtectedRoutes>
              ),
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
    { path: '/setlocation', element: <SetLocationPage /> },
    { path: '/setnickname', element: <SetNicknamePage /> },
    { path: '/setprofile', element: <SetProfilePage /> },
    { path: '/logincomplete', element: <LoginCompletePage /> },
    { path: '*', element: <NotFoundPage /> }, // 404 페이지
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
