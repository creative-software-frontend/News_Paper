'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TableRow from './TableRow';
import Link from 'next/link';
import { HiOutlineSearch, HiFilter, HiPlus } from 'react-icons/hi';
import axios from 'axios';
import NewsModal from '@/app/components/Admin/Modal/NewsView';

// Fetch function
const fetchNews = async (page, limit = 7, search = '', category = '') => {
  let url = `http://localhost:5000/all-news?page=${page}&limit=${limit}&search=${search}`;
  if (category) url += `&category=${category}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

const MyNewsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 7;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = news => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/get-category`
        );
        setCategories(res.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Query for news data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['allNews', page, search, selectedCategory],
    queryFn: () => fetchNews(page, limit, search, selectedCategory),
    keepPreviousData: true,
  });

  // Refetch when search or category changes
  useEffect(() => {
    setPage(1); // Reset to first page
    refetch();
  }, [search, selectedCategory]);

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">Error fetching news</div>
    );
  }

  const totalCount = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const currentData = data?.data || [];
  const currentPage = Math.max(1, Math.min(page, totalPages));

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50  max-w-9xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          News Management
        </h1>
        <p className="text-gray-600">
          Manage all your news articles in one place
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-4xl">
            {/* Search Input */}
            <div className="relative flex-1 md:w-full">
              <HiOutlineSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search news heading , category"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            {/* <div className="relative flex-1 md:w-48">
              <HiFilter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories?.map(category => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div> */}
          </div>

          {/* Add New Button */}
          <Link href={'/admin/add-news'}>
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg">
              <HiPlus size={20} />
              Add New Article
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total News</p>
              <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Page</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentPage} / {totalPages}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">News Per Page</p>
              <p className="text-2xl font-bold text-gray-900">{limit}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.length}
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  News
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan="5" className="px-6 py-4">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map(news => (
                  <TableRow
                    key={news.id}
                    news={news}
                    refetch={refetch}
                    onView={() => openModal(news)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg
                        className="w-16 h-16 mb-4 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-lg font-medium mb-2">
                        No news articles found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* modal */}
          <NewsModal
            isOpen={isModalOpen}
            onClose={closeModal}
            news={selectedNews}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {Math.max(0, (currentPage - 1) * limit + 1)}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(currentPage * limit, totalCount)}
              </span>{' '}
              of <span className="font-medium">{totalCount}</span> results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`w-10 h-10 rounded-md border ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      } transition-colors`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="px-2">...</span>}
              </div>

              <button
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNewsPage;
