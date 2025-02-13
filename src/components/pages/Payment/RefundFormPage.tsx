import React, { useState } from 'react';
import styled from 'styled-components';
import { handleRefund } from './api/paymentApi';

interface RefundForm {
  paymentKey: string;
  cancelReason: string;
  refundReceiveAccount: {
    bank: string;
    accountNumber: string;
    holderName: string;
  };
}

interface RefundModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

const RefundFormPage: React.FC<RefundModalProps> = ({
  isOpen,
  onClose,
  postId,
}) => {
  const [form, setForm] = useState<RefundForm>({
    paymentKey: '',
    cancelReason: '',
    refundReceiveAccount: {
      bank: '',
      accountNumber: '',
      holderName: '',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // refundReceiveAccount 필드들 처리
    if (['bank', 'accountNumber', 'holderName'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        refundReceiveAccount: {
          ...prev.refundReceiveAccount,
          [name]: value,
        },
      }));
    } else {
      // 다른 최상위 필드들 처리
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    handleRefund(postId, form);
    alert('환불 신청이 접수되었습니다!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Title>환불 신청</Title>

        <Form>
          <Label>
            구매키
            <Input
              type="text"
              name="paymentKey"
              value={form.paymentKey}
              onChange={handleChange}
            />
          </Label>

          <Label>
            환불 사유
            <TextArea
              name="cancelReason"
              value={form.cancelReason}
              onChange={handleChange}
            />
          </Label>

          <Label>
            계좌 소유주
            <Input
              type="text"
              name="holderName"
              value={form.refundReceiveAccount.holderName}
              onChange={handleChange}
            />
          </Label>

          <Label>
            은행
            <Input
              type="text"
              name="bank"
              value={form.refundReceiveAccount.bank}
              onChange={handleChange}
            />
          </Label>

          <Label>
            계좌번호
            <Input
              type="text"
              name="accountNumber"
              value={form.refundReceiveAccount.accountNumber}
              onChange={handleChange}
            />
          </Label>
        </Form>

        <ButtonGroup>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default RefundFormPage;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  resize: none;
  height: 80px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;

const CancelButton = styled.button`
  background: #ccc;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
