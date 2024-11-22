import React from 'react';
import styled from 'styled-components';

type InputComponentProps = {
  input: string;
  setInput: (value: string) => void;
};

const InputComponent: React.FC<InputComponentProps> = ({ input, setInput }) => {
  return (
    <InputWrapper>
      <StyledInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 2rem;
`;

const StyledInput = styled.input`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  width: 60%;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4f86e6;
    box-shadow: 0 0 10px rgba(79, 134, 230, 0.3);
  }

  ::placeholder {
    color: #888;
  }
`;

export default InputComponent;
