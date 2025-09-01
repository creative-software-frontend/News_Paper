'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  HiPlus,
  HiTrash,
  HiTag,
  HiCollection,
  HiCheckCircle,
  HiExclamationCircle,
  HiXCircle,
} from 'react-icons/hi';

const CategoryPage = () => {
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/get-category');
      return res.data;
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!category.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/add-category`,
        { category: category.trim() }
      );

      if (response?.data?.id) {
        toast.success('Category added successfully! 🎉');
        refetch();
        setCategory('');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to add category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the category and might affect associated content.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      background: '#fff',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg font-medium',
        cancelButton: 'px-4 py-2 rounded-lg font-medium',
      },
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_ROOT_URL}/delete-category/${id}`
          );

          if (response?.data?.deleted === true) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Category has been deleted successfully.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              background: '#fff',
              customClass: {
                popup: 'rounded-xl',
              },
            });
            refetch();
          }
        } catch (err) {
          console.error('Error:', err);
          toast.error('Failed to delete category. Please try again.');
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-600 p-4 rounded-2xl mb-4 inline-flex">
            <HiExclamationCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Categories
          </h3>
          <p className="text-gray-600 mb-4">
            Please check your connection and try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HiCollection className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
            Category Management
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Organize your content with categories to improve navigation and
            content discovery
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Add Category Form */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HiPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  Add New Category
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Create a new category for your content
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiTag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="category"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      placeholder="e.g., Technology, Sports, News"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base bg-gray-50/50"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !category.trim()}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <HiPlus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
                      Add Category
                    </>
                  )}
                </button>
              </form>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {categories.length}
                    </div>
                    <div className="text-xs text-blue-800">
                      Total Categories
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-green-600">
                      {categories.length}
                    </div>
                    <div className="text-xs text-green-800">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Categories List */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <HiCollection className="w-5 h-5 text-green-600" />
                    </div>
                    Existing Categories
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Manage your content categories
                  </p>
                </div>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                  {categories.length}{' '}
                  {categories.length === 1 ? 'category' : 'categories'}
                </span>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HiTag className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No categories yet
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Add your first category to get started
                  </p>
                  <button
                    onClick={() => document.getElementById('category')?.focus()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Create Category
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat, index) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50/50 transition-all duration-200 group border border-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {index + 1}
                        </div>
                        <span className="text-base font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                          {cat.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete category"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state illustration for when there are categories but it looks sparse */}
              {categories.length > 0 && categories.length < 4 && (
                <div className="mt-8 text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                    <HiXCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Add more categories to organize your content better
                  </p>
                </div>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <HiCheckCircle className="w-5 h-5 text-blue-600" />
                Why Use Categories?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Better Organization
                    </p>
                    <p className="text-xs text-gray-600">
                      Keep your content neatly organized
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Easy Navigation
                    </p>
                    <p className="text-xs text-gray-600">
                      Users can find content faster
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Content Discovery
                    </p>
                    <p className="text-xs text-gray-600">
                      Help users discover related content
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      SEO Benefits
                    </p>
                    <p className="text-xs text-gray-600">
                      Improve your search engine ranking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
