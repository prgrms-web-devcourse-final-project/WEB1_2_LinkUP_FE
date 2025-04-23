import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#007bff' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#f5f5f5')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
