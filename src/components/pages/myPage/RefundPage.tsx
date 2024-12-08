import React, { useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import styled from 'styled-components';

function RefundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountData, setAccountData] = useState({
    bank: '신한은행',
    owner: '굿바이어',
    accountNumber: '111-111-111111',
  });

  const [modalData, setModalData] = useState(accountData);

  const handleEditClick = () => {
    setModalData(accountData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRegister = () => {
    setAccountData(modalData);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <Title>환불계좌 관리</Title>
        <Desc>
          계좌는 1개만 등록 가능하며 본인명의 계좌만 등록/변경 가능합니다.
          <br />
          등록된 계좌는 현금결제 주문 취소 시 해당 계좌로 환불 금액이 입금되오니
          정확하게 기입해 주시기 바랍니다.
        </Desc>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>은행명</Th>
                <Th>예금주</Th>
                <Th>계좌번호</Th>
                <Th> </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>{accountData.bank}</Td>
                <Td>{accountData.owner}</Td>
                <Td>{accountData.accountNumber}</Td>
                <Td>
                  <ButtonWrapper>
                    <EditButton onClick={handleEditClick}>수정</EditButton>
                    <DeleteButton>삭제</DeleteButton>
                  </ButtonWrapper>
                </Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalTable>
                <thead>
                  <tr>
                    <Th>은행명</Th>
                    <Th>예금주</Th>
                    <Th>계좌번호</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>
                      <Input
                        type="text"
                        name="bank"
                        value={modalData.bank}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name="owner"
                        value={modalData.owner}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name="accountNumber"
                        value={modalData.accountNumber}
                        onChange={handleInputChange}
                      />
                    </Td>
                  </tr>
                </tbody>
              </ModalTable>
              <ModalButtons>
                <RegisterButton onClick={handleRegister}>등록</RegisterButton>
                <CancelButton onClick={handleCloseModal}>취소</CancelButton>
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </GS.Content>
    </GS.Wrapper>
  );
}
const Desc = styled.div`
  color: #88868c;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #555;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  text-align: center;
`;

const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`;

export default RefundPage;
