'use client';
import { IoMenu, IoClose } from 'react-icons/io5';
import { MdLibraryAdd } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import NotificationDropdown from '../Dropdowns/NotificationDropdown';
import UserDropdown from '../Dropdowns/UserDropdown';
import { AiOutlineDesktop } from 'react-icons/ai';
import { FaAddressCard, FaUserFriends } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const pathname = usePathname();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 sm:px-3">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <div className="flex items-center justify-between p-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="button"
              onClick={() =>
                setCollapseShow('bg-white m-2 py-3 px-6 shadow-lg rounded-lg')
              }
              aria-label="Toggle menu"
            >
              <IoMenu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg
                  className="w-6 h-6"
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
              <div className="flex flex-col">
                <span className="text-xl font-bold">Daily News</span>
                <span className="text-xs text-gray-500 font-medium">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Spacer for alignment (hidden on mobile) */}
            <div className="hidden md:block w-6"></div>
          </div>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Mobile Collapse Header */}
            <div className="md:hidden flex items-center justify-between border-b border-gray-200 bg-white pb-2">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
              >
                <span className="flex items-center">
                  <span className="text-blue-500">Daily</span>
                  <span className="text-gray-700">News</span>
                </span>
              </Link>

              <button
                type="button"
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setCollapseShow('hidden')}
                aria-label="Close menu"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <div className=" flex flex-col gap-2 sm:border-t-1 sm:border-gray-300 pt-2">
              <Link href={'/admin/dashboard'}>
                <button
                  className={`
                          w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                          ${
                            pathname === '/admin/dashboard'
                              ? 'bg-sky-100 text-sky-600 font-medium shadow-sm'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                          }
                        `}
                >
                  <AiOutlineDesktop
                    size={20}
                    className={
                      pathname === '/admin/dashboard'
                        ? 'text-sky-500'
                        : 'text-gray-500'
                    }
                  />
                  <span className="text-sm">Dashboard</span>
                </button>
              </Link>

              <Link href={'/admin/my-news'}>
                <button
                  className={`
                        w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                          pathname === '/admin/my-news'
                            ? 'bg-sky-100 text-sky-600 font-medium shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }
                      `}
                >
                  <FaAddressCard
                    size={20}
                    className={
                      pathname === '/admin/my-news'
                        ? 'text-sky-500'
                        : 'text-gray-500'
                    }
                  />
                  <span className="text-sm">My News</span>
                </button>
              </Link>

              <Link href={'/admin/users'}>
                <button
                  className={`
                                w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                ${
                                  pathname === '/admin/users'
                                    ? 'bg-sky-100 text-sky-600 font-medium shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                }
                              `}
                >
                  <FaUserFriends
                    size={20}
                    className={
                      pathname === '/admin/users'
                        ? 'text-sky-500'
                        : 'text-gray-500'
                    }
                  />
                  <span className="text-sm">Users</span>
                </button>
              </Link>
              <Link href={'/admin/category'}>
                <button
                  className={`
                             w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                     ${
                                       pathname === '/admin/category'
                                         ? 'bg-sky-100 text-sky-600 font-medium shadow-sm'
                                         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                     }
                           `}
                >
                  <MdLibraryAdd
                    size={20}
                    className={
                      pathname === '/admin/category'
                        ? 'text-sky-500'
                        : 'text-gray-500'
                    }
                  />
                  <span className="text-sm">Add Category</span>
                </button>
              </Link>
              <Link href={'/admin/setting'}>
                <button
                  className={`
                             w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                     ${
                                       pathname === '/admin/setting'
                                         ? 'bg-sky-100 text-sky-600 font-medium shadow-sm'
                                         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                     }
                           `}
                >
                  <IoSettingsOutline
                    size={20}
                    className={
                      pathname === '/admin/setting'
                        ? 'text-sky-500'
                        : 'text-gray-500'
                    }
                  />
                  <span className="text-sm">Setting</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
