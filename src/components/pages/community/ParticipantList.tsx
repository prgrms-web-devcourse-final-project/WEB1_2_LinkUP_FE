import React from 'react';
import { useAtom } from 'jotai';
import { sseDataAtom } from '../../../store/sseStore';
import { useAuth } from '../../../context/AuthContext';

const ParticipantList: React.FC = () => {
  const [sseData] = useAtom(sseDataAtom);
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // 관리자가 아니면 아무것도 표시하지 않음
    return null;
  }

  if (!sseData || !sseData.participants.length) {
    return <div>참여자 데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h2>참여자 목록 (관리자 전용)</h2>
      <ul>
        {sseData.participants.map((participant) => (
          <li key={participant.userId}>
            <p>
              닉네임: {participant.nickname} | 수량: {participant.quantity} |{' '}
              {participant.isCancelled ? '취소됨' : '참여 중'} |{' '}
              {participant.isPaymentCompleted ? '결제 완료' : '결제 대기'} |{' '}
            </p>
          </li>
        ))}
      </ul>
      <p>참여 인원: {sseData.participationCount}</p>
      <p>결제 완료 인원: {sseData.paymentCount}</p>
      <p>환불 완료 인원: {sseData.refundedCount}</p>
    </div>
  );
};

export default ParticipantList;
