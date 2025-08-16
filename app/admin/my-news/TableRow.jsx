'use client';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';
import Link from 'next/link';

const TableRow = ({ news, refetch }) => {
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
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {news?.image ? (
            <Image
              src={news.image}
              alt={news?.title || 'News Image'}
              width={100} // px
              height={150} // px
              className="rounded-md object-cover"
            />
          ) : (
            <div
              className="rounded-md flex items-center justify-center text-gray-500 text-sm"
              style={{
                width: '100px',
                height: '50px',
                backgroundColor: '#e5e7eb',
              }} // Tailwind bg-gray-200 equivalent
            >
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
        {news.publish}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/admin/my-news/${news.id}`}>
          <button className="text-blue-600 hover:text-blue-900 mr-3">
            Edit
          </button>
        </Link>
        <button
          onClick={() => handelDelete(news.id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
