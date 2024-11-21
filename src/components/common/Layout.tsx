import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      {/* Footer */}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체를 채우기 위해 설정 */
`;

const MainContent = styled.main`
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 1rem;
  margin-bottom: 150px;
`;

export default Layout;
