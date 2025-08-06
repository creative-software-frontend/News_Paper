import Image from "next/image";

const businessArticles = [
  {
    title: "Movies on TV this week: ‘Goldfinger’ on BBC",
    excerpt:
      "More off this less hello salamander lied porpoise much over tightly circa horse...",
    author: "codemin",
    date: "May 18, 2022",
    img: '/img/BusinessSection (1).jpg'
  },
  {
    title: "11 Inspiring Books to Add to Your Reading List",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way...",
    author: "codemin",
    date: "April 22, 2022",
    img: '/img/BusinessSection (2).jpg'
  },
  {
    title:
      "Laws Make College Transfer Easier for Community College Students",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way...",
    author: "codemin",
    date: "April 22, 2022",
    img: '/img/BusinessSection (3).jpg'
  },
];

const BusinessSection = () => {
  return (
    <section className="my-10">
      <h2 className="text-lg font-bold border-b border-dotted  mb-6 uppercase">
        Business
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businessArticles.map((article, idx) => (
          <div key={idx}>
            <Image
              src={article.img}
              alt={article.title}
              className="w-full h-64 object-cover "
              width={500}
              height={500}
            />
            <h3 className="text-md font-bold mt-3 cursor-pointer">{article.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {article.excerpt}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {article.author} · {article.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessSection;
