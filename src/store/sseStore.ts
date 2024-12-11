import { atom } from 'jotai';
import { POST_STATUS } from '../types/postTypes';

export interface SSEParticipant {
  userId: number;
  nickname: string;
  quantity: number;
  isCancelled: boolean;
  isPaymentCompleted: boolean;
  isRefunded: boolean;
}

export interface SSEData {
  participants: SSEParticipant[];
  participationCount: number;
  postStatus: POST_STATUS;
  participationStatus:
    | 'JOIN'
    | 'CANCEL'
    | 'PAYMENT_STANDBY'
    | 'PAYMENT_COMPLETE'
    | null;
  paymentCount: number;
  refundedCount: number;
}

export const sseDataAtom = atom<SSEData | null>(null);
