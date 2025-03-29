import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  region: string | null;
  setRegion: (region: string | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [region, setRegion] = useState<string | null>(null);

  return (
    <LocationContext.Provider value={{ region, setRegion }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
