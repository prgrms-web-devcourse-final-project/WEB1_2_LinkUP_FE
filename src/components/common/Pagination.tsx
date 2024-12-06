import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <Container>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid #fff;
  background-color: ${({ active }) => (active ? '#000' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default Pagination;
