'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isAuthenticated } from '../utils/auth';

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== 'admin') {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  return children;
}
