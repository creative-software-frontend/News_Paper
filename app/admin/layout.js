'use client';

import '../globals.css';
import Sidebar from '../components/Admin/Sidebar/Sidebar';

import FooterAdmin from '../components/Admin/Footers/FooterAdmin';

// TanStack Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '../components/PrivateRoute';

const uiSans = {
  variable: '--font-ui-sans',
  fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
};

export default function AdminLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className={`${uiSans.variable}`}>
      <body>
        <QueryClientProvider client={queryClient}>
          <PrivateRoute>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
              <div className="px-2 sm:px-10 mx-auto w-full min-h-[calc(100vh-300px)]">
                {children}
              </div>

              <FooterAdmin />
            </div>
          </PrivateRoute>

          {/* Toast container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* React Query Devtools (development only) */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
