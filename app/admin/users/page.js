'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserRow from './UserRow';
import { HiOutlineSearch, HiUsers, HiFilter, HiRefresh } from 'react-icons/hi';
import { FaUser, FaEnvelope, FaUserTag, FaUserCircle } from 'react-icons/fa';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/all-user', {
        params: { page, limit, search },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalUsers(res.data.totalUsers || res.data.data.length);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-9xl  mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-100 rounded-xl">
              <HiUsers className="text-2xl text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              User Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage all users and their permissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <HiUsers className="text-blue-600 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Pages
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {page}/{totalPages}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FaUserTag className="text-green-600 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaUserCircle className="text-purple-600 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Per Page</p>
                <p className="text-2xl font-bold text-gray-900">{limit}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <HiFilter className="text-orange-600 text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 md:w-64">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <HiFilter className="text-gray-600" />
                <span>Filters</span>
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <HiRefresh className="text-lg" />
              Refresh
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {loading ? (
            // Loading Skeleton
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex items-center space-x-4"
                >
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            // Empty State
            <div className="text-center py-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiUsers className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No users found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => setSearch('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          User
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-gray-400" />
                          Email
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FaUserTag className="text-gray-400" />
                          Role
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{(page - 1) * limit + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(page * limit, totalUsers)}
                  </span>{' '}
                  of <span className="font-medium">{totalUsers}</span> users
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`w-10 h-10 rounded-lg border ${
                            page === pageNumber
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
                    onClick={() =>
                      setPage(prev => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
