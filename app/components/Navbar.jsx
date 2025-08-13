// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { SlSocialInstagram,SlSocialFacebook ,SlSocialLinkedin  } from "react-icons/sl";

// const NavItems = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const toggleMobileServices = () => setMobileServicesOpen(!mobileServicesOpen);

//   return (
//    <div className="">
//      <nav className="fixed w-full z-30 top-0 start-0 shadow-sm bg-primary">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between ">
//         <div className="flex items-center justify-between w-full md:w-auto">
//           <Link href="/" className=" items-center space-x-3">
//             <span className="text-2xl font-semibold font-serif text-primary">
//               Newsmagify
//             </span>
//             <p className='font-normal text-gray-600'>Best News WordPress Theme</p>
//           </Link>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center space-x-3">
//             <Link href="/contact" className="md:hidden">
//               <button className="button-primary text-sm px-3 py-1.5">Contact</button>
//             </Link>
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary hover:bg-gray-100 focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? '' : <FaBars className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex md:items-center md:order-1">
//           <ul className="flex space-x-8 font-medium">
//             <li>
//               <Link href="/" className="text-primary hover:text-primary-active transition-colors">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/about" className="text-primary hover:text-primary-active transition-colors">
//                 About
//               </Link>
//             </li>
//             <li className="relative group">
//               <div className="flex items-center space-x-1 cursor-pointer">
//                 <button className="text-primary hover:text-primary-active transition-colors">OurBlog</button>
//                 <FaChevronDown className="w-3 h-3 text-primary group-hover:text-primary-active" />
//               </div>
//               <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
//                 <ul className="py-2">
//                   <li>
//                     <Link
//                       href="/services/web-development"
//                       className="block px-4 py-2 text-secondary hover:button-primary"
//                     >
//                       Web Development
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/services/app-development"
//                       className="block px-4 py-2 text-secondary hover:text-primary-active"
//                     >
//                       App Development
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/services/seo"
//                       className="block px-4 py-2 text-secondary hover:text-primary-active"
//                     >
//                       SEO Optimization
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </li>
//             <li>
//               <Link href="/team" className="text-primary hover:text-primary-active transition-colors">
//                 Advertise

//               </Link>
//             </li>
//              <li>
//               <Link href="/team" className="text-primary hover:text-primary-active transition-colors">
//                 Contact Us

//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Desktop Contact Button */}
//         <div className="hidden md:flex gap-5 md:order-2">

//           <SlSocialInstagram />
//          <SlSocialFacebook />
//          <SlSocialLinkedin  />
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-96 bg-primary z-40 transform transition-all duration-300 ease-in-out shadow-xl ${
//           isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:hidden`}
//       >
//         <div className="p-4 flex flex-col space-y-4">
//           <div className="flex justify-between items-center border-b border-gray pb-4">
//             <Link href="/" onClick={toggleMenu} className="text-lg text-primary-active font-semibold">
//               Newsmagify
//             </Link>

//             <button onClick={toggleMenu} aria-label="Close menu">
//               <FaTimes className="w-5 h-5 text-primary" />
//             </button>
//           </div>

//           <Link href="/" onClick={toggleMenu} className="text-lg text-primary hover:text-primary-active">
//             Home
//           </Link>
//           <Link href="/about" onClick={toggleMenu} className="text-lg text-primary hover:text-primary-active">
//             About
//           </Link>

//           {/* Mobile Dropdown */}
//           <div className="text-lg">
//             <button
//               onClick={toggleMobileServices}
//               className="flex items-center cursor-pointer justify-between w-full text-primary hover:text-primary-active"
//             >
//               <span className='cursor-pointer'>OurBlog</span>
//               {mobileServicesOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
//             </button>
//             <div
//               className={`ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
//                 mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//               }`}
//             >
//               <Link
//                 href="/services/web-development"
//                 onClick={toggleMenu}
//                 className="block text-secondary hover:text-primary-active "
//               >
//                 Web Development
//               </Link>
//               <Link
//                 href="/services/app-development"
//                 onClick={toggleMenu}
//                 className="block text-secondary hover:text-primary-active"
//               >
//                 App Development
//               </Link>
//               <Link
//                 href="/services/seo"
//                 onClick={toggleMenu}
//                 className="block text-secondary hover:text-primary-active"
//               >
//                 SEO Optimization
//               </Link>
//             </div>
//           </div>

//           <Link href="/team" onClick={toggleMenu} className="text-lg text-primary hover:text-primary-active">
//             Advertise

//           </Link>
//           <Link href="/contact" onClick={toggleMenu} className="text-lg text-primary hover:text-primary-active">
//             Contact Us
//           </Link>
//         </div>
//       </div>
//     </nav>
//    </div>
//   );
// };

// export default NavItems;

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
              className="text-xl cursor-pointer lg:hidden"
              onClick={() => setMenuOpen(true)}
            />
            <span> আজ বৃহস্পতিবার, ০৭ আগস্ট ২০২৫</span> |
            <span>২৩ই শ্রাবণ ১৪৩২ বঙ্গাব্দ</span>|
            <span>১১ই সফর, ১৪৪৭ হিজরি</span>
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
