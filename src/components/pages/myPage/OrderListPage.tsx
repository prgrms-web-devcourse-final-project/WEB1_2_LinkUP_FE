import React, { useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import styled from 'styled-components';
import OrderHistory from './OrderListComponents/OrderHistory';
import RefundHistory from './OrderListComponents/RefundHistory';
import GroupPurchaseHistory from './OrderListComponents/GroupPurchaseHistory';

function OrderListPage() {
  const [activeTab, setActiveTab] = useState('order');

  const renderContent = () => {
    switch (activeTab) {
      case 'order':
        return <OrderHistory />;
      case 'refund':
        return <RefundHistory />;
      case 'group':
        return <GroupPurchaseHistory />;
      default:
        return null;
    }
  };

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <PageTitle>주문 내역 관리</PageTitle>
        <TabsContainer>
          <Tab
            $isActive={activeTab === 'order'}
            onClick={() => setActiveTab('order')}
          >
            주문내역
          </Tab>
          {/* <Tab
            $isActive={activeTab === 'refund'}
            onClick={() => setActiveTab('refund')}
          >
            환불내역
          </Tab> */}
          <Tab
            $isActive={activeTab === 'group'}
            onClick={() => setActiveTab('group')}
          >
            공동구매 참여내역
          </Tab>
        </TabsContainer>
        <TabContent>{renderContent()}</TabContent>
      </GS.Content>
    </GS.Wrapper>
  );
}

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #2a5985;
  margin-bottom: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #dae8f2;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? 'bold' : '500')};
  color: ${(props) => (props.$isActive ? '#2d6cae' : '#6f8ca7')};
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    color: #2d6cae;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: ${(props) => (props.$isActive ? '3px' : '0')};
    background-color: #3b7fc4;
    transition: all 0.3s ease;
  }
`;

const TabContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 50, 0.05);
  border: 1px solid #e3eef7;
`;

export default OrderListPage;
