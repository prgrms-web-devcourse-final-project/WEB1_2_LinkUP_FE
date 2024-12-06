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
        <TabsContainer>
          <Tab
            $isActive={activeTab === 'order'}
            onClick={() => setActiveTab('order')}
          >
            주문내역
          </Tab>
          <Tab
            $isActive={activeTab === 'refund'}
            onClick={() => setActiveTab('refund')}
          >
            환불내역
          </Tab>
          <Tab
            $isActive={activeTab === 'group'}
            onClick={() => setActiveTab('group')}
          >
            공동구매 참여내역
          </Tab>
        </TabsContainer>
        {renderContent()}
      </GS.Content>
    </GS.Wrapper>
  );
}
const TabsContainer = styled.div`
  display: flex;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? 'bold' : '500')};
  color: ${(props) => (props.$isActive ? '#000' : '#555')};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: ${(props) => (props.$isActive ? '2px' : '0')};
    background-color: #000;
    transition: height 0.3s ease;
  }
`;

export default OrderListPage;
