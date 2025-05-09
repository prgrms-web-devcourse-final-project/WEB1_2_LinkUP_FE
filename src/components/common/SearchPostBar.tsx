import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

function SearchPostBar({
  searchTerm,
  onSearchChange,
  placeholder = '제목으로 검색',
}: SearchBarProps) {
  return (
    <SearchContainer>
      <SearchIcon>
        <FaSearch size={14} />
      </SearchIcon>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
      />
      {searchTerm && (
        <ClearButton
          onClick={() => onSearchChange('')}
          aria-label="clear search"
        >
          ✕
        </ClearButton>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 55%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 38px;
  top: 20px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 0.9rem;
  background-color: #fff;
  color: #334155;
  outline: none;
  transition:
    border 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: -70px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;

  &:hover {
    color: #64748b;
  }
`;

export default SearchPostBar;
