import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </>
  );
};

export default App
