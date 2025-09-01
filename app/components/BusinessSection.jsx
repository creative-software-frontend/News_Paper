import Image from 'next/image';
import { getNews } from '../lib/getNews';

const BusinessSection = async () => {
  const businessNews = await getNews('ব্যবসায়');

  return (
    <section className="my-10">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold mr-4 uppercase">ব্যবসায়</h2>
        <div className="flex flex-col  flex-grow gap-[2px] mt-1">
          <div className="border-t border-dotted border-black w-full h-0"></div>
          <div className="border-t border-dotted border-black w-full h-0"></div>
          <div className="border-t border-dotted border-black w-full h-0"></div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businessNews.slice(0, 3).map((article, idx) => (
          <div key={idx}>
            <Image
              src={
                article?.image?.startsWith('http')
                  ? article.image
                  : article?.image
                  ? `${process.env.NEXT_PUBLIC_ROOT_URL}${article.image}`
                  : '/fallback.jpg'
              }
              alt={article.title}
              className="w-full h-64 object-cover "
              width={500}
              height={500}
            />
            <h3 className="text-md font-bold mt-3 cursor-pointer">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {article.description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              প্রকাশ:{' '}
              {new Date(article.publish).toLocaleDateString('bn-BD', {
                weekday: 'long', // রোববার
                year: 'numeric', // ২০২৫
                month: 'long', // আগস্ট
                day: 'numeric', // ৩১
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessSection;
