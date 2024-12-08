import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCommunity, GroupPurchaseType } from '../../../../api/mypageApi';

const GroupPurchaseHistory = () => {
  const [groupPurchaseList, setGroupPurchaseList] = useState<
    GroupPurchaseType[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getCommunity();

        setGroupPurchaseList(response);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchPost();
  }, []);

  const getStatusLabel = (status: string): string => {
    return STATUS_MAP[status] || '알 수 없는 상태';
  };

  return (
    <Container>
      <OrderList>
        {groupPurchaseList.map((groupPurchase, idx) => (
          <GroupPurchaseItem key={idx}>
            <GroupPurchaseWrapper>
              <ImageContainer>
                {groupPurchase.imageUrls[0] !== '' ? (
                  <img
                    src={groupPurchase.imageUrls[0]}
                    width={60}
                    height={60}
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </ImageContainer>
              <GroupPurchaseDetails>
                <ProductName>{groupPurchase.title}</ProductName>
                <ProductInfo>
                  Quantity: {groupPurchase.availableNumber}
                </ProductInfo>
                <StatusBadge>
                  {getStatusLabel(groupPurchase.status)}
                </StatusBadge>
              </GroupPurchaseDetails>
            </GroupPurchaseWrapper>
            <Price>{groupPurchase.unitAmount}원</Price>
            <Actions>
              <ActionButton
                onClick={() => {
                  navigate(`/community/post/${groupPurchase.communityPostId}`);
                }}
              >
                상품 페이지 이동
              </ActionButton>
              {groupPurchase.status === 'APPROVED' && (
                <>
                  <QRCodeButton>QR 코드 확인</QRCodeButton>
                  <ReviewLink>
                    <ReviewIcon src="/images/qricon.png" alt="review icon" />
                    <span>리뷰 작성하기</span>
                  </ReviewLink>
                </>
              )}
              {groupPurchase.status === 'NOT_APPROVED' && (
                <>
                  <CancelButton>주문 취소하기</CancelButton>
                </>
              )}
            </Actions>
          </GroupPurchaseItem>
        ))}
      </OrderList>
    </Container>
  );
};

const STATUS_MAP: { [key: string]: string } = {
  NOT_APPROVED: '승인대기',
  APPROVED: '승인완료',
  PAYMENT_STANDBY: '결제 대기',
  PAYMENT_COMPLETED: '결제 완료',
  REJECTED: '승인 거절',
  DELETED: '글 삭제',
};

const GroupPurchaseWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GroupPurchaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const GroupPurchaseDetails = styled.div`
  margin-left: 20px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

const StatusBadge = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #000;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #131118;
    color: #fff;
  }
`;

const CancelButton = styled.div`
  background: #fff;
  color: #ff7262;
  border: 1px solid #ff7262;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7262;
    color: #fff;
  }
`;

const ReviewLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  margin-top: 8px;

  span {
    border-bottom: 1px solid #000;
  }
`;

const ReviewIcon = styled.img`
  width: 16px;
  height: 16px;
`;
const QRCodeButton = styled.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  &:hover {
    background: #131118;
    color: #fff;
  }
`;

export default GroupPurchaseHistory;
