'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Select from 'react-select'; // ✅ react-select import

// Jodit Editor (dynamic import)
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddNewsPage() {
  const router = useRouter();

  // form data
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    categories: [], // array of selected categories
    description: '',
    headline: false,
  });

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/get-category`
        );
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // handle normal inputs & image
  const handleChange = e => {
    const { name, value, files } = e.target;

    if (files) {
      // file input
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // handle submit
  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      formData.categories.length === 0
    ) {
      alert('Please fill all required fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('headline', formData.headline);

    // ✅ publish: current datetime
    const today = new Date();
    const formattedDateTime = today
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    formDataToSend.append('publish', formattedDateTime);

    if (formData.image) formDataToSend.append('image', formData.image);

    // categories
    formDataToSend.append('categories', JSON.stringify(formData.categories));

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/news`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'News submitted successfully!',
        });

        // ✅ reset form with all fields (including headline)
        setFormData({
          title: '',
          image: null,
          categories: [],
          description: '',
          headline: false,
        });
        setPreview(null);

        router.push('/admin/my-news');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  // react-select options
  const categoryOptions = categories.map(cat => ({
    value: cat.category,
    label: cat.category,
  }));

  return (
    <>
      <Head>
        <title>Create News | News Portal</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create News
            </h1>
            <p className="text-gray-600">
              Share your latest news with our community
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  News Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a compelling headline"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-11"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    className="h-5 w-4"
                    type="checkbox"
                    name="headline"
                    checked={formData.headline} // ✅ controlled input
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        headline: e.target.checked,
                      }))
                    }
                  />
                  <span>Add To Headline</span>
                </div>
              </div>

              {/* Categories Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories <span className="text-red-500">*</span>
                </label>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={categoryOptions.filter(opt =>
                    formData.categories.includes(opt.value)
                  )}
                  onChange={selectedOptions => {
                    setFormData(prev => ({
                      ...prev,
                      categories: selectedOptions.map(opt => opt.value),
                    }));
                  }}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select categories..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>

                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2 rounded-lg border border-gray-200 max-h-64 object-cover w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image: null }));
                        setPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  News Content <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <JoditEditor
                    value={formData.description}
                    onChange={newContent =>
                      setFormData(prev => ({
                        ...prev,
                        description: newContent.replace(/<[^>]+>/g, ''),
                      }))
                    }
                    config={{
                      height: 350,
                      toolbarButtonSize: 'medium',
                      theme: 'default',
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Publishing...' : 'Publish News'}
                </button>

                <button
                  type="reset"
                  onClick={() =>
                    setFormData({
                      title: '',
                      image: null,
                      categories: [],
                      description: '',
                      headline: false, // ✅ reset properly
                    })
                  }
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all flex items-center"
                >
                  ← Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
