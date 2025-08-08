import Image from "next/image";

const sportsNews = [
  {
    title: "Teams qualified for 2024 Copa America Cup",
    date: "May 18, 2022",
    author: "codemin",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way...",
    img: "/img/sports (1).jpg",
  },
  {
    title: "National Team Draws for Euro Cup",
    date: "April 25, 2022",
    author: "codemin",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way...",
    img: "/img/sports (2).jpg",
  },
  {
    title: "Soccer’s Five Substitutes Rule Will Be Permanent",
    date: "April 22, 2022",
    author: "codemin",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way...",
    img: "/img/sports (3).jpg",
  },
  {
    title: "Marquez Explains Lack of Confidence During Qatar GP Race",
    date: "April 21, 2022",
    author: "codemin",
    excerpt: "Now more than ever, it’s important for your immune system to...",
    img: "/img/sports (4).jpg",
  },
  {
    title: "The World Championship Results",
    date: "April 22, 2022",
    author: "codemin",
    excerpt: "Look for Santorini on Instagram and the shots that really...",
    img: "/img/sports (5).jpg",
  },
  {
    title: "Champions League Semifinals",
    date: "April 21, 2022",
    author: "codemin",
    excerpt: "When you’re fending off the feels (you know the ones)...",
    img: "/img/sports (6).jpg",
  },
];

const lifestyleNews = [
  {
    title: "The 14 Most Relaxing Places in the World",
    date: "September 12, 2022",
  },
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
];

const entertainmentNews = [
  ...lifestyleNews,
  {
    title: "Movies on TV this week: ‘Goldfinger’ on BBC",
    date: "May 18, 2022",
  },
  {
    title: "BTS Discusses Anti-Asian Hate at White House",
    date: "April 29, 2022",
  },
];

const Sports = () => {
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
          {sportsNews.map((item, idx) => (
            <div key={idx}>
              <Image
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover "
                width={500}
                height={500}
              />
              <h3 className="text-md font-bold mt-3  transition-colors duration-200 cursor-pointer">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2 ">
                {item.excerpt}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {item.author} · {item.date}
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
