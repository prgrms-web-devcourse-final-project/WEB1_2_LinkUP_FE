import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void; // 검색 실행 핸들러
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '검색어를 입력해주세요.',
  value,
  onChange,
  onSearch,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchBarWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress} // 엔터 키로 검색 실행
      />
      <SearchIcon onClick={onSearch} /> {/* 아이콘 클릭으로 검색 실행 */}
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  max-width: 280px;

  &:focus-within {
    border-color: #000;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 1rem;
  padding: 8px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #333;
  margin: 0 8px;
  font-size: 1.2rem;
  cursor: pointer; /* 클릭 가능 */
`;

export default SearchBar;
