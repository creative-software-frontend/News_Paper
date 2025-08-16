import Image from 'next/image';
import { getNews } from '../lib/getNews';

const businessArticles = [
  {
    title: 'Movies on TV this week: ‘Goldfinger’ on BBC',
    excerpt:
      'More off this less hello salamander lied porpoise much over tightly circa horse...',
    author: 'codemin',
    date: 'May 18, 2022',
    img: '/img/BusinessSection (1).jpg',
  },
  {
    title: '11 Inspiring Books to Add to Your Reading List',
    excerpt:
      'Lorem ipsum was conceived as filler text, formatted in a certain way...',
    author: 'codemin',
    date: 'April 22, 2022',
    img: '/img/BusinessSection (2).jpg',
  },
  {
    title: 'Laws Make College Transfer Easier for Community College Students',
    excerpt:
      'Lorem ipsum was conceived as filler text, formatted in a certain way...',
    author: 'codemin',
    date: 'April 22, 2022',
    img: '/img/BusinessSection (3).jpg',
  },
  {
    title: 'Laws Make College Transfer Easier for Community College Students',
    excerpt:
      'Lorem ipsum was conceived as filler text, formatted in a certain way...',
    author: 'codemin',
    date: 'April 22, 2022',
    img: '/img/travel.jpg',
  },
];

const International = async () => {
  const InternationalNews = await getNews('আন্তর্জাতিক');

  return (
    <section className="my-10">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold mr-4 uppercase">International</h2>
        <div className="flex flex-col  flex-grow gap-[2px] mt-1">
          <div className="border-t border-dotted border-black w-full h-0"></div>
          <div className="border-t border-dotted border-black w-full h-0"></div>
          <div className="border-t border-dotted border-black w-full h-0"></div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {InternationalNews.slice(0, 4).map((article, idx) => (
          <div key={idx}>
            <Image
              src={article.image}
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
            <p className="text-xs text-gray-500 mt-1">
              Publish at : {article.publish}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default International;
