import React from 'react';
import styled from 'styled-components';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { POST_STATUS } from '../../../../types/postTypes';
import { formatDateWithOffset } from '../../../../utils/formatDate';

interface PostDetailsSectionProps {
  selectedPost: {
    title: string;
    nickname: string;
    createdAt: string;
    category: string;
    availableNumber: number;
    totalAmount: number;
    unitAmount: number;
    status: string;
  } | null;
  realTimeData: {
    participationCount: number;
  } | null;
  quantity: number;
  isParticipant: boolean;
  isNotParticipant: boolean;
  remainingTime: string;
  paymentRemainingTime: string;
  handleQuantityChange: (change: number) => void;
  handleJoin: () => void;
  handleCancel: () => void;
  handleRefund: () => void;
  handlePayment: () => void;
}

const PostDetailsSection: React.FC<PostDetailsSectionProps> = ({
  selectedPost,
  realTimeData,
  quantity,
  isParticipant,
  isNotParticipant,
  remainingTime,
  paymentRemainingTime,
  handleQuantityChange,
  handleJoin,
  handleCancel,
  handleRefund,
  handlePayment,
}) => {
  if (!selectedPost) return null;

  return (
    <DetailsAndInfoContainer>
      <DetailsContainer>
        <Detail>
          <Label>제목</Label>
          <DetailText>{selectedPost.title}</DetailText>
        </Detail>
        <DoubleWrapper>
          <AuthorDetail>
            <Label>작성자</Label>
            <AuthorNickname>{selectedPost.nickname}</AuthorNickname>
          </AuthorDetail>
          <CreatedAtDetail>
            <Label>작성일</Label>
            {formatDateWithOffset(selectedPost.createdAt).toLocaleString()}
          </CreatedAtDetail>
        </DoubleWrapper>
        <DoubleWrapper>
          <Detail>
            <Label>카테고리</Label> {selectedPost.category}
          </Detail>
          <Detail>
            <Label>참여 현황</Label> {realTimeData?.participationCount || 0}
            {' / '}
            {selectedPost.availableNumber}
          </Detail>
        </DoubleWrapper>
        <DoubleWrapper>
          <Detail>
            <Label>모집 마감</Label> {formatDateWithOffset(remainingTime)}
          </Detail>
          {selectedPost.status === 'PAYMENT_STANDBY' && (
            <Detail>
              <Label>결제 마감</Label>
              <DetailText>
                {formatDateWithOffset(paymentRemainingTime)}
              </DetailText>
            </Detail>
          )}
        </DoubleWrapper>
        <DoubleWrapper>
          <Detail>
            <Label>총 가격</Label> {selectedPost.totalAmount.toLocaleString()}{' '}
            원
          </Detail>
          <Detail>
            <Label>개당 가격</Label> {selectedPost.unitAmount.toLocaleString()}{' '}
            원
          </Detail>
        </DoubleWrapper>
        <DoubleWrapper>
          <Detail>
            <Label>수량</Label>
            <Quantity>
              {isNotParticipant && (
                <>
                  <FaMinusCircle onClick={() => handleQuantityChange(-1)} />
                  <span>{quantity}</span>
                  <FaPlusCircle onClick={() => handleQuantityChange(1)} />
                </>
              )}
              {isParticipant && <span>{quantity}</span>}
            </Quantity>
          </Detail>
          {isParticipant && (
            <Detail>
              <Label>결제 금액</Label>
              <PaymentAmount>
                {(quantity * selectedPost.unitAmount).toLocaleString()} 원
              </PaymentAmount>
            </Detail>
          )}
        </DoubleWrapper>
        <ActionButtons>
          {selectedPost.status === POST_STATUS.PAYMENT_COMPLETED ? (
            <ActionButton primary onClick={handleRefund}>
              환불
            </ActionButton>
          ) : selectedPost.status === POST_STATUS.PAYMENT_STANDBY ? (
            <>
              {isParticipant && (
                <>
                  <ActionButton primary onClick={handlePayment}>
                    결제
                  </ActionButton>
                  <ActionButton onClick={handleCancel}>취소</ActionButton>
                </>
              )}
            </>
          ) : selectedPost.status === POST_STATUS.APPROVED ? (
            <>
              {isNotParticipant ? (
                <ActionButton primary onClick={handleJoin}>
                  참여
                </ActionButton>
              ) : (
                <ActionButton onClick={handleCancel}>취소</ActionButton>
              )}
            </>
          ) : null}
        </ActionButtons>
      </DetailsContainer>
    </DetailsAndInfoContainer>
  );
};

export default PostDetailsSection;

const DetailsAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 490px;
  max-width: 490px;
  height: 470px;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
`;

const DetailText = styled.span`
  color: #333;
`;

const DoubleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const AuthorDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorNickname = styled.div`
  font-size: 1rem;
`;

const CreatedAtDetail = styled.div`
  font-size: 1rem;
`;

const Quantity = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const PaymentAmount = styled.div`
  color: #333;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  background: ${(props) => (props.primary ? '#000' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;
