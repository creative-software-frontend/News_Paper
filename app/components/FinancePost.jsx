import Image from "next/image";

const financePosts = [
  {
    title: "Oil Prices Rise Amid Anticipated Cold Weather",
    date: "September 12, 2022",
    author: "codemin",
    img: "/img/img1 (1).jpg",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque...",
  },
  {
    title: "Netflix Is Poised to Produce a Significant Decline Ahead",
    date: "April 22, 2022",
    author: "codemin",
    img: "/img/img1 (2).jpg",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation...",
  },
  {
    title: "Cisco Shares Rise on Earnings and Revenue Beat",
    date: "April 22, 2022",
    author: "codemin",
    img: "/img/img1 (3).jpg",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation...",
  },
  {
    title: "Silicon Valley Activism’s Impact on Technology Industry",
    date: "April 21, 2022",
    author: "codemin",
    img: "/img/img1 (4).jpg",
    excerpt:
      "Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation...",
  },
];

export default function FinanceSection() {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold border-b border-dotted  pb-1 mb-6">
        FINANCE
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {financePosts.map((post, index) => (
          <div key={index} className="group ">
            <Image
              src={post.img}
              alt={post.title}
              className="w-full h-48 object-cover "
              width={500}
              height={500}
            />
            <h3 className="text-md font-bold mt-3 cursor-pointer transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {post.excerpt}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {post.author} · {post.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
