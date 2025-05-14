import React, { useEffect, useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import styled from 'styled-components';
import {
  deleteMyPost,
  getMyPostList,
  MyPostType,
} from '../../../api/mypageApi';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from './OrderListPage';
import Pagination from '../../../components/common/Pagination';

const MyPostsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPostList, setMyPostList] = useState<MyPostType[]>([]);
  const [deleteId, setDeleteId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const itemsPerPage = 10;

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const fetchPost = async () => {
    try {
      const response = await getMyPostList();
      setMyPostList(response);
    } catch (error) {
      console.error('failed', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [shouldRefresh]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedPosts = myPostList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <PageTitle>나의 게시글</PageTitle>
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
              {paginatedPosts.map((myPost, index) => (
                <tr key={index}>
                  <Td
                    onClick={() =>
                      navigate(`/community/post/${myPost.communityPostId}`)
                    }
                  >
                    {myPost.title}
                  </Td>
                  <Td
                    onClick={() =>
                      navigate(`/community/post/${myPost.communityPostId}`)
                    }
                  >
                    {formatDate(myPost.createdAt)}
                  </Td>
                  <Td>
                    <ButtonWrapper>
                      <EditButton
                        onClick={() => {
                          navigate(
                            `/community/post/${myPost.communityPostId}/edit`
                          );
                        }}
                      >
                        수정
                      </EditButton>
                      <DeleteButton
                        onClick={() => {
                          handleDeleteClick();
                          setDeleteId(myPost.communityPostId + '');
                        }}
                      >
                        삭제
                      </DeleteButton>
                    </ButtonWrapper>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(myPostList.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              삭제하시겠습니까?
              <ModalButtons>
                <RegisterButton
                  onClick={async () => {
                    setIsModalOpen(false);
                    await deleteMyPost(deleteId);
                    setShouldRefresh((prev) => !prev); // 삭제 후 리프레시
                  }}
                >
                  예
                </RegisterButton>
                <CancelButton onClick={handleCloseModal}>아니요</CancelButton>
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </GS.Content>
    </GS.Wrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  background-color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 14px 16px;
  background-color: #ebf5ff;
  font-size: 14px;
  font-weight: 600;
  color: #4a90e2;
  text-align: center;
  border-bottom: 1px solid #e1efff;
  &:first-child {
    width: 50%;
  }
  &:nth-child(2) {
    width: 30%;
  }
  &:last-child {
    width: 20%;
  }
`;

const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #f0f7ff;
  font-size: 14px;
  color: #555;
  text-align: center;
  transition: background-color 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:first-child {
    text-align: center;
  }
  &:hover {
    background-color: #f8fbff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const EditButton = styled.button`
  padding: 8px 18px;
  font-size: 14px;
  color: #fff;
  background-color: #64b5f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #42a5f5;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(66, 165, 245, 0.3);
  }
`;

const DeleteButton = styled.button`
  padding: 8px 18px;
  font-size: 14px;
  color: #5c93ce;
  background-color: #fff;
  border: 1px solid #bbdefb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #f5faff;
    color: #4a90e2;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(100, 181, 246, 0.15);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 28px 24px;
  border-radius: 12px;
  width: 300px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  font-size: 16px;
  color: #444;
`;

const ModalButtons = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const RegisterButton = styled.button`
  padding: 10px 24px;
  background-color: #64b5f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    background-color: #42a5f5;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(66, 165, 245, 0.25);
  }
`;

const CancelButton = styled.button`
  padding: 10px 24px;
  background-color: #fff;
  color: #5c93ce;
  border: 1px solid #bbdefb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    background-color: #f5faff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(100, 181, 246, 0.15);
  }
`;

export default MyPostsPage;
