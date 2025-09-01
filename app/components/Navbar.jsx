'use client';

import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import {
  HiOutlineMenuAlt1,
  HiOutlineSearch,
  HiChevronDown,
} from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import NavTime from './NavTime';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavItems = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Fetch categories
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

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/search?value=${search}`);
    }
  };

  const mainCategories = categories.slice(0, 9);
  // const secCategories = categories.slice(0, 10);
  const dropdownCategories = categories.slice(8);

  return (
    <header className=" bg-white ">
      <div className="max-w-7xl mx-auto ">
        {/* Top Bar */}
        <div className="border-b border-gray-200 ">
          <div className="flex justify-between items-center py-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt1 size={24} className="text-gray-700" />
            </button>

            {/* Time */}
            <NavTime />

            {/* Social Media - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Logo */}
        <Link href={'/'}>
          {' '}
          <div className="text-center py-4 border-b border-gray-400">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 tracking-tight">
              The Daily News
            </h1>
            <p className="text-xs text-gray-500 mt-1">Trusted News Source</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-between py-3 border-b border-gray-400 ">
          {/* Categories */}
          <div className="flex items-center gap-4 text-sm font-medium">
            {mainCategories.map((item, idx) => (
              <a
                key={idx}
                href={`/category_search?value=${item.category}`}
                className="text-gray-700 hover:text-red-600 transition-colors py-2  font-semibold text-[15px] whitespace-nowrap"
              >
                {item?.category}
              </a>
            ))}

            {dropdownCategories.length > 0 && (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-red-600 transition-colors py-2 px-1 font-semibold text-[15px]">
                  অন্যান্য
                  <HiChevronDown className="ml-1 text-xs" />
                </button>

                <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 hidden group-hover:block z-50">
                  <div className="py-2 max-h-60 overflow-y-auto">
                    {dropdownCategories.map((item, idx) => (
                      <a
                        key={idx}
                        href={`/category_search?value=${item.category}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      >
                        {item.category}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Inline Search */}
          <div className="relative max-w-md mx-auto flex justify-end w-full">
            <form onSubmit={handleSearch} className="flex items-center w-full">
              {/* Input with search icon */}
              <div className="relative flex-1 ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search news..."
                  className="block w-full pl-10 pr-4 py-2.5 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg  focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="ml-2 px-4 py-2.5 text-sm font-medium text-white bg-[#F63C25] rounded-lg hover:bg-[#c02b17] focus:outline-none focus:ring-2  transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="lg:hidden border-t border-gray-100 py-3">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search news..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors">
              <HiOutlineSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white w-full h-full px-6 pt-6 overflow-y-auto lg:hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold font-serif text-gray-900">
                Daily News
              </h1>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoClose size={24} className="text-gray-700" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Categories
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block py-3 px-4 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors border-b border-gray-100"
                  >
                    {item.category}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Us
              </h2>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <FaYoutube size={16} />
                </a>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
              <p>© 2025 The Daily News. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavItems;
