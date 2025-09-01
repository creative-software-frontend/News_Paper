'use client';
import { useState, useEffect } from 'react';
import { getNews } from '../lib/getNews';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';

const NewsTabs = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [latestNews, setLatestNews] = useState(null); // start with null

  useEffect(() => {
    const fetchLatest = async () => {
      const data = await getNews('সর্বশেষ');
      setLatestNews(data);
    };
    fetchLatest();
  }, []);

  if (!latestNews) return <div>Loading...</div>; // render fallback during SSR

  const popularNews = [
    'রেমিট্যান্সে আস্থা রাখছে প্রবাসীরা',
    'রাজনৈতিক উত্তেজনা বাড়ছে রাজধানীতে',
    'বন্যা পরিস্থিতি অবনতির আশঙ্কা',
    'নির্বাচন কমিশন প্রস্তুতিতে ব্যস্ত',
    'স্বাস্থ্য খাতে বড় ধরনের বরাদ্দ',
    'শিক্ষা ব্যবস্থায় নতুন পরিবর্তন',
    'অর্থনীতিতে সম্ভাবনার নতুন দিগন্ত',
  ];

  const getNewsList = () => (activeTab === 'latest' ? latestNews : popularNews);

  return (
    <div className="w-full max-w-md mx-auto border border-gray-300 rounded">
      <div className="flex bg-gray-100">
        {['latest', 'popular'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 cursor-pointer text-sm font-medium text-center border-b-2 transition-all duration-300 ${
              activeTab === tab
                ? 'border-[#F44336] bg-white text-black'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab === 'latest' ? 'সর্বশেষ' : 'সর্বাধিক পঠিত'}
          </button>
        ))}
      </div>

      <div className="max-h-96 overflow-y-auto p-4 space-y-4 bg-white">
        {getNewsList().map((item, index) => (
          <div
            key={index}
            className="text-sm border-b pb-2 hover:text-[#F44336] cursor-pointer transition-colors duration-200"
          >
            {item.title || item}
            <p className="text-xs text-gray-400 mt-1">
              {item.publish
                ? formatDistanceToNow(
                    new Date(
                      new Date(item.publish).getTime() + 6 * 60 * 60 * 1000
                    ),
                    { addSuffix: true, locale: bn }
                  )
                : '২২ মিনিট আগে'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTabs;
