'use client';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';
import Link from 'next/link';
import { GrFormView } from 'react-icons/gr';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';

const TableRow = ({ news, refetch, onView }) => {
  const handelDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        // Axios DELETE request
        const response = await axios.delete(`http://localhost:5000/news/${id}`);

        if (response.data.deleted) {
          Swal.fire('Deleted!', 'The news has been deleted.', 'success');
          refetch();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
        console.error(error);
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {news?.image ? (
            <Image
              src={
                news?.image?.startsWith('http')
                  ? news.image
                  : news?.image
                  ? `${process.env.NEXT_PUBLIC_ROOT_URL}${news.image}`
                  : '/fallback.jpg'
              }
              alt={news?.title || 'News Image'}
              width={100}
              height={70}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="w-[100px] h-[50px] flex items-center justify-center bg-gray-200 rounded-md text-gray-500 text-sm">
              N/A
            </div>
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {news.title}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${
              news.category === 'Politics'
                ? 'bg-red-100 text-red-800'
                : news.category === 'Sports'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
        >
          {news.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 line-clamp-2">
          {news.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(news?.publish).toLocaleDateString('bn-BD', {
          weekday: 'long', // রোববার
          year: 'numeric', // ২০২৫
          month: 'long', // আগস্ট
          day: 'numeric', // ৩১
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end space-x-3">
          {/* View Button */}
          <button
            onClick={onView}
            className="flex items-center px-3 py-1.5 text-sm text-gray-900  rounded-md hover:bg-blue-100 bg-blue-200 hover:text-blue-700 transition-colors duration-200"
            title="View Details"
          >
            <GrFormView className="w-4 h-4 mr-1" />
            View
          </button>

          {/* Edit Button */}
          <Link href={`/admin/my-news/${news.id}`}>
            <button
              className="flex items-center px-3 py-1.5 text-sm text-gray-600 bg-green-200  rounded-md hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
              title="Edit News"
            >
              <FaEdit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => handelDelete(news.id)}
            className="flex items-center px-3 py-1.5 text-sm text-gray-600 bg-red-200 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
            title="Delete News"
          >
            <MdDelete className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
