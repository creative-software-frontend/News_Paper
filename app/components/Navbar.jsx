'use client';

import { useState } from 'react';
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
import SearchInput from './SearchInput';
import NavTime from './NavTime';

const menuItems = [
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

const NavItems = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div>
        <div className="flex justify-between items-center text-sm  py-2">
          <div className="flex items-center gap-2">
            <HiOutlineMenuAlt1
              size={35}
              className="text-xl cursor-pointer lg:hidden"
              onClick={() => setMenuOpen(true)}
            />
            <NavTime></NavTime>
          </div>
          <div className="hidden lg:flex justify-end gap-5 ml-2 text-gray-600 pt-2">
            <div className="border p-1 border-gray-100 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="border p-1 border-gray-100 cursor-pointer">
              <FaLinkedinIn />
            </div>
            <div className="border p-1 border-gray-100 cursor-pointer">
              <FaInstagram />
            </div>
            <div className="border p-1 border-gray-100 cursor-pointer">
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center py-2">
        <h1 className="text-4xl font-bold font-serif tracking-wider">
          The Daily News
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-center gap-4 text-sm font-medium border-t border-b py-3">
        {[
          'সর্বশেষ',
          'জাতীয়',
          'রাজনীতি',
          'অর্থনীতি',
          'আন্তর্জাতিক',
          'সারাদেশ',
          'খেলা',
          'বিনোদন',
          'চাকরি',
          'আরও',
        ].map((item, idx) => (
          <div key={idx} className="relative group cursor-pointer">
            <div className="flex items-center">
              <span className="hover:text-red-600 transition text-xl">
                {item}
              </span>
              {(item === 'আরও' || item === 'সারাদেশ') && (
                <HiChevronDown className="ml-1 text-xs" />
              )}
            </div>
            {(item === 'আরও' || item === 'সারাদেশ') && (
              <div className="absolute left-0 top-full mt-1 w-40 bg-white shadow-lg border border-white  hidden group-hover:block z-10">
                <ul className="text-left text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100">জেলা সংবাদ</li>
                  <li className="px-4 py-2 hover:bg-gray-100">ইসলাম</li>
                  <li className="px-4 py-2 hover:bg-gray-100">প্রবাস</li>
                </ul>
              </div>
            )}
          </div>
        ))}

        <SearchInput />
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white w-full h-full px-4 pt-4 overflow-y-auto"
          >
            {/* Close Icon */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold font-serif tracking-wider">
                Daily News
              </h1>
              <IoClose
                className="text-3xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Search Field */}
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="এখানে খুঁজুন..."
                className="flex-1 border px-3 py-2 rounded-l outline-none"
              />
              <button className="bg-[#F44336] text-white px-4 rounded-r">
                <HiOutlineSearch />
              </button>
            </div>

            {/* Menu List */}
            <ul className="grid grid-cols-2 gap-2 text-sm font-medium">
              {menuItems.map((item, idx) => (
                <li key={idx} className="border-b py-1">
                  <span className="cursor-pointer hover:text-red-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>© 2025 Daily News</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavItems;
