import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

// 포스트별 수량 정보를 위한 인터페이스
interface QuantityData {
  [userId: string]: {
    [postId: string]: number;
  };
}

interface QuantityContextProps {
  saveQuantity: (userId: string, postId: string, value: number) => void;
  getQuantity: (userId: string, postId: string) => number;
}

const QuantityContext = createContext<QuantityContextProps | undefined>(
  undefined
);

export const QuantityProvider = ({ children }: { children: ReactNode }) => {
  // 사용자와 포스트별 수량 데이터
  const [quantityData, setQuantityData] = useState<QuantityData>({});

  // 로컬 스토리지에서 데이터 불러오기 (컴포넌트 마운트 시)
  useEffect(() => {
    const storedData = localStorage.getItem('quantityData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setQuantityData(parsedData);
      } catch (error) {
        console.error('Failed to parse stored quantity data:', error);
      }
    }
  }, []);

  // 수량 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (Object.keys(quantityData).length > 0) {
      localStorage.setItem('quantityData', JSON.stringify(quantityData));
    }
  }, [quantityData]);

  // 특정 사용자와 포스트의 수량 저장
  const saveQuantity = (userId: string, postId: string, value: number) => {
    setQuantityData((prev) => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [postId]: value,
      },
    }));
  };

  // 특정 사용자와 포스트의 수량 불러오기
  const getQuantity = (userId: string, postId: string): number => {
    return quantityData[userId]?.[postId] || 1; // 기본값 1
  };

  return (
    <QuantityContext.Provider
      value={{
        saveQuantity,
        getQuantity,
      }}
    >
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
