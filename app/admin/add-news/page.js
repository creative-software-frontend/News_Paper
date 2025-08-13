'use client';
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Swal from 'sweetalert2';

export default function AddNewsPage() {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    category: '',
    description: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    'প্রচ্ছদ',
    'সর্বশেষ',
    'জাতীয়',
    'রাজনীতি',
    'অর্থনীতি',
    'আন্তর্জাতিক',
    'সারাদেশ',
    'রাজধানী',
    'শিক্ষা',
    'খেলা',
    'বিনোদন',
    'চাকরি',
    'ডাক্তারের পরামর্শ',
    'ইসলাম ও জীবন',
    'লাইফস্টাইল',
    'বিজ্ঞান ও প্রযুক্তি',
    'সাহিত্য',
    'চিত্র বিচিত্র',
    'সম্পাদকীয়',
    'পরবাস',
    'বিচ্ছু',
    'ছবি',
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const todayDate = new Date();

    let hours = todayDate.getHours();
    const minutes = todayDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 ঘন্টাকে 12 হিসেবে দেখাবে

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    const formattedDateTime = `${todayDate
      .getDate()
      .toString()
      .padStart(2, '0')}-${(todayDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${todayDate.getFullYear()} ${formattedTime}`;

    const postData = {
      ...formData,
      publish: formattedDateTime, // DD-MM-YYYY HH:MM AM/PM
    };

    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/news', postData);

      if (response?.data?.id) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Response:', response.data);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        title: '',
        image: null,
        category: '',
        description: '',
      });
      setPreviewImage(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit news.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add News Article</title>
      </Head>

      <div className="min-h-screen bg-gray-50 pt-5">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Add News Article
            </h1>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                Article submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>

                {previewImage ? (
                  <div className="relative mb-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image: null }));
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG (Max. 2MB)
                        </p>
                      </div>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: '',
                      description: '',
                      category: '',
                      image: null,
                    });
                    setPreviewImage(null);
                    setSubmitSuccess(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Article'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
