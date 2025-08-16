'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TableRow from './TableRow';
import Link from 'next/link';

// fetch function
const fetchNews = async (page, limit = 7) => {
  const res = await fetch(
    `http://localhost:5000/all-news?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json(); // { data, total, page, totalPages }
};

const MyNewsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['allNews', page],
    queryFn: () => fetchNews(page, limit),
    keepPreviousData: true,
  });

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">Error fetching news</div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All News Table</h1>
        <Link href={'/admin/add-news'}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Add New Article
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data.length > 0 ? (
                data.data.map(news => (
                  <TableRow key={news.id} news={news} refetch={refetch} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No news found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {data.page} of {data.totalPages}
          </span>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, data.totalPages))}
            disabled={page === data.totalPages}
            className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyNewsPage;
