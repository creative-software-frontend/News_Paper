import Image from 'next/image';
import { getNews } from '../lib/getNews';
import Link from 'next/link';

const lifestyleNews = [
  {
    title: 'The 14 Most Relaxing Places in the World',
    date: 'September 12, 2022',
  },
  {
    title: 'Olivia Rodrigo lead American Music Award nominees',
    date: 'June 16, 2022',
  },
  {
    title: 'The Most Romantic Small Towns in Europe',
    date: 'June 15, 2022',
  },
  {
    title: 'Glastonbury Festival fashion history',
    date: 'May 18, 2022',
  },
];

const entertainmentNews = [
  ...lifestyleNews,
  {
    title: 'Movies on TV this week: ‘Goldfinger’ on BBC',
    date: 'May 18, 2022',
  },
  {
    title: 'BTS Discusses Anti-Asian Hate at White House',
    date: 'April 29, 2022',
  },
];

const Sports = async () => {
  const sportsNews = await getNews('খেলা');

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
      <div className="lg:col-span-2">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-bold mr-4">SPORTS</h2>
          <div className="flex flex-col  flex-grow gap-[2px] mt-1">
            <div className="border-t border-dotted border-black w-full h-0"></div>
            <div className="border-t border-dotted border-black w-full h-0"></div>
            <div className="border-t border-dotted border-black w-full h-0"></div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportsNews.slice(0, 6).map((item, idx) => (
            <div key={idx}>
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover "
                width={500}
                height={500}
              />
              <Link href={`/news/${item.id}`}>
                <h3 className="text-md font-bold mt-3 cursor-pointer transition-colors duration-200">
                  {item.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2 ">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Publish at : {item.publish}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold mr-4"> LIFESTYLE</h2>
            <div className="flex flex-col  flex-grow gap-[2px] mt-1">
              <div className="border-t border-dotted border-black w-full h-0"></div>
              <div className="border-t border-dotted border-black w-full h-0"></div>
              <div className="border-t border-dotted border-black w-full h-0"></div>
            </div>
          </div>
          <ul className="space-y-3">
            {lifestyleNews.map((item, idx) => (
              <li key={idx}>
                <p className="text-md font-bold mt-3  transition-colors duration-200 cursor-pointer">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 ">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold mr-4">ENTERTAINMENT</h2>
            <div className="flex flex-col  flex-grow gap-[2px] mt-1">
              <div className="border-t border-dotted border-black w-full h-0"></div>
              <div className="border-t border-dotted border-black w-full h-0"></div>
              <div className="border-t border-dotted border-black w-full h-0"></div>
            </div>
          </div>
          <ul className="space-y-3">
            {entertainmentNews.map((item, idx) => (
              <li key={idx}>
                <p className="text-md font-bold mt-3  transition-colors duration-200 cursor-pointer">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sports;
