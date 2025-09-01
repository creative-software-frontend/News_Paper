// app/(users)/category_search/page.jsx

import Footer from '@/app/components/Footer';
import NavItems from '@/app/components/Navbar';
import { getNews } from '@/app/lib/getNews';
import Image from 'next/image';
import Link from 'next/link';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.value || 'all';
  const news = await getNews(category);

  return (
    <>
      <NavItems></NavItems>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 min-h-screen">
        {news.slice(0, 4).map(post => (
          <div key={post.id} className="group">
            <Image
              src={
                post?.image?.startsWith('http')
                  ? post.image
                  : post?.image
                  ? `${process.env.NEXT_PUBLIC_ROOT_URL}${post.image}`
                  : '/fallback.jpg'
              }
              alt={post.title}
              className="w-full h-48 object-cover"
              width={500}
              height={500}
            />
            <Link href={`/news/${post.id}`}>
              <h3 className="text-md font-bold mt-3 cursor-pointer transition-colors duration-200">
                {post.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {post.description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.publish).toLocaleDateString('bn-BD', {
                weekday: 'long', // রোববার
                year: 'numeric', // ২০২৫
                month: 'long', // আগস্ট
                day: 'numeric', // ৩১
              })}
            </p>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </>
  );
}
