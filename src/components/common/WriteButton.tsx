import React from 'react';
import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface WriteButtonProps {
  navigateTo?: string; // 기본 이동 경로
}

const WriteButton: React.FC<WriteButtonProps> = ({ navigateTo = '/write' }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(navigateTo)}>
      <FaPen /> 글 작성
    </Button>
  );
};

const Button = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export default WriteButton;
