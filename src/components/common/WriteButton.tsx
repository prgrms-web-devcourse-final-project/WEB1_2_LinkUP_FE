import React from 'react';
import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';

interface WriteButtonProps {
  onClick: () => void; // 클릭 이벤트 핸들러를 받음
}

const WriteButton: React.FC<WriteButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
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
