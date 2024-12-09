import React, { createContext, useState, useContext, ReactNode } from 'react';

interface QuantityContextProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

const QuantityContext = createContext<QuantityContextProps | undefined>(
  undefined
);

export const QuantityProvider = ({ children }: { children: ReactNode }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantity = () => {
  const context = useContext(QuantityContext);
  if (!context) {
    throw new Error('useQuantity must be used within a QuantityProvider');
  }
  return context;
};
