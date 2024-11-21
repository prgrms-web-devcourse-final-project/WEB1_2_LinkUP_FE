import React, { useState, useEffect } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import styled from 'styled-components';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 최상단 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <Button onClick={scrollToTop}>
      <FaAngleDoubleUp />
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;

export default ScrollToTopButton;
