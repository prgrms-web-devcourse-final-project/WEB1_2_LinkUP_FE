import React, { useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import styled from 'styled-components';

function MyPostsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <Title>나의 게시글</Title>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>제목</Th>
                <Th>날짜</Th>
                <Th> </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>titititititititi</Td>
                <Td>2024-11-18</Td>
                <Td>
                  <ButtonWrapper>
                    <EditButton>수정</EditButton>
                    <DeleteButton onClick={handleDeleteClick}>
                      삭제
                    </DeleteButton>
                  </ButtonWrapper>
                </Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              삭제하시겠습니까?
              <ModalButtons>
                <RegisterButton>예</RegisterButton>
                <CancelButton onClick={handleCloseModal}>아니요</CancelButton>
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </GS.Content>
    </GS.Wrapper>
  );
}

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

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
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
  width: 250px;
  max-width: 90%;
  text-align: center;
`;

const ModalButtons = styled.div`
  margin-top: 30px;
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

export default MyPostsPage;
