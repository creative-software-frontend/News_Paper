import NewsCard from "./NewsCard";
import Slider from "./Slider";

const NewsSection = () => {
  const politicsNews = [
    {
      title: "Oil Prices Rise Amid Anticipated Cold Weather",
      date: "September 12, 2022",
    },
    {
      title: "Next Stop for Democrats",
      date: "June 15, 2022",
    },
    {
      title: "Anti-War Protests Intensify in the World",
      date: "April 22, 2022",
    },
    {
      title: "How to Spend the Perfect Day on Croatia",
      date: "April 21, 2022",
    },
  ];

  const hollywoodNews = [
    {
      title: "Olivia Rodrigo lead American Music Award nominees",
      date: "June 16, 2022",
    },
    {
      title: "The Most Romantic Small Towns in Europe",
      date: "June 15, 2022",
    },
    {
      title: "Glastonbury Festival fashion history",
      date: "May 18, 2022",
    },
    {
      title: "Movies on TV this week: ‘Goldfinger’ on BBC",
      date: "May 18, 2022",
    },
    {
      title: "BTS Discusses Anti-Asian Hate at White House",
      date: "April 29, 2022",
    },
  ];

  return (
    <div className=" py-5 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* HOT STORIES */}
      <div className=" md:col-span-2 ">
        <h2 className="text-lg font-bold border-b border-dotted  mb-4">
          HOT STORIES
        </h2>
        <Slider />
      </div>

      {/* POLITICS */}
      <div className=" md:col-span-1">
        <h2 className="text-lg font-bold border-b border-dotted  mb-4">
          POLITICS
        </h2>
        {politicsNews.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>

      {/* HOLLYWOOD */}
      <div className=" md:col-span-1 ">
        <h2 className="text-lg font-bold border-b border-dotted  mb-4">
          HOLLYWOOD
        </h2>
        {hollywoodNews.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
