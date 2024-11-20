import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import HomePage from './components/pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
