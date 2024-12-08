import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './routes/router.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle } from './styles/global.js';
import { AuthProvider } from './context/AuthContext.js';
import { QuantityProvider } from './context/QuantityContext.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <QuantityProvider>
        <GlobalStyle />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </QuantityProvider>
    </AuthProvider>
  </QueryClientProvider>
);
