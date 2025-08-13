'use client'; // Client Component, কারণ useState লাগবে

import '../globals.css';
import Sidebar from '../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../components/Admin/Navbars/AdminNavbar';
import HeaderStats from '../components/Admin/Headers/HeaderStats';
import FooterAdmin from '../components/Admin/Footers/FooterAdmin';

// TanStack Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

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
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            {/* Header */}
            <HeaderStats />

            <div className="px-4 md:px-10 mx-auto w-full min-h-[calc(100vh-300px)]">
              {children}{' '}
              {/* এখন যেকোনো page বা component TanStack Query ব্যবহার করতে পারবে */}
            </div>

            <FooterAdmin />
          </div>

          {/* React Query Devtools (development only) */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
