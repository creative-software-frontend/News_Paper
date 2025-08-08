'use client'
import { useState } from "react";

const tabs = [
  { id: "latest", label: "সর্বশেষ" },
  { id: "popular", label: "সর্বাধিক পঠিত" },
];

const latestNews = [
  "বিকাশ অ্যাপে এখন পাওয়া যাচ্ছে রেমিট্যান্স স্টেটমেন্ট",
  "হত্যা মামলা: ধর্ষণযুদ্ধে ৩ জনের মৃত্যুদণ্ড",
  "ঢাকা সেন্ট্রাল ইউনিভার্সিটি: ২৬ আগস্টের মধ্যে আবেদন চান শিক্ষার্থীরা",
  "ধানের শীষ হাতের কুণ্ডুষের রেখে বিজয় র‌্যালিতে উৎসব",
  "সরকারকে ধন্যবাদ জানিয়েছেন আব্দুর রহমান",
  "রাজধানীতে গৃহবধূকে হত্যা",
  "জুলাইয়ে অর্জনসহ নিয়ে নির্দিষ্ট সময়ের মধ্যে প্রধানমন্ত্রীর উপস্থাপনে দিনক্ষণ ডাট ট্র্যাকিং",
];

const popularNews = [
  "রেমিট্যান্সে আস্থা রাখছে প্রবাসীরা",
  "রাজনৈতিক উত্তেজনা বাড়ছে রাজধানীতে",
  "বন্যা পরিস্থিতি অবনতির আশঙ্কা",
  "নির্বাচন কমিশন প্রস্তুতিতে ব্যস্ত",
  "স্বাস্থ্য খাতে বড় ধরনের বরাদ্দ",
  "শিক্ষা ব্যবস্থায় নতুন পরিবর্তন",
  "অর্থনীতিতে সম্ভাবনার নতুন দিগন্ত",
];

const NewsTabs = () => {
  const [activeTab, setActiveTab] = useState("latest");

  const getNewsList = () => {
    return activeTab === "latest" ? latestNews : popularNews;
  };

  return (
    <div className="w-full max-w-md mx-auto border border-gray-300 rounded">
    
      <div className="flex bg-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 cursor-pointer text-sm font-medium text-center border-b-2 transition-all duration-300 ${
              activeTab === tab.id
                ? "border-[#F44336] bg-white text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      
      <div className="max-h-96 overflow-y-auto p-4 space-y-4 bg-white">
        {getNewsList().map((item, index) => (
          <div
            key={index}
            className="text-sm border-b pb-2 hover:text-[#F44336] cursor-pointer transition-colors duration-200"
          >
            {item}
            <p className="text-xs text-gray-400 mt-1">৫ মিনিট আগে</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTabs;
