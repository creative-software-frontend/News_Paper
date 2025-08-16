import { getSingleNews } from '@/app/lib/getSingleNews';
import Image from 'next/image';

const NewsDetailsPage = async ({ params }) => {
  const id = params.id;

  const singleNews = await getSingleNews(id);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-1/4 order-1 lg:order-1">
            <div className="sticky top-4 space-y-6">
              {/* Table of Contents */}
              <div className="bg-white  p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#section1"
                      className="text-blue-600 hover:underline"
                    >
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section2"
                      className="text-blue-600 hover:underline"
                    >
                      Key Findings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section3"
                      className="text-blue-600 hover:underline"
                    >
                      Expert Analysis
                    </a>
                  </li>
                </ul>
              </div>

              {/* Related News */}
              <div className="bg-white  p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4">Related News</h3>
                <div className="space-y-4">
                  {/* NewsCardSmall Component */}
                  {[1, 2, 3].map(item => (
                    <div
                      key={item}
                      className="flex gap-3 items-start border-b pb-4 last:border-b-0"
                    >
                      <div className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={`https://picsum.photos/seed/${item}/200/150`}
                          alt="Related news"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">
                          <a href="#" className="hover:text-blue-600">
                            Related news headline about current events
                          </a>
                        </h4>
                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-2/4 order-2 lg:order-2">
            <article className="bg-white  p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  {singleNews.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Publish at : {singleNews.publish}</span>
                </div>
              </div>

              <div className="prose max-w-none dark:prose-invert">
                <img
                  src={singleNews.image}
                  alt="News"
                  className="w-full h-auto rounded-lg mb-6"
                />

                <h2 id="section1" className="text-2xl font-bold mt-8 mb-4">
                  Introduction
                </h2>
                <p className="mb-4">{singleNews.decryption}</p>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-8 bg-white  p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-6">Comments (24)</h3>
              <div className="space-y-6">
                {[1, 2].map(item => (
                  <div key={item} className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/150?img=${item}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100  p-3 rounded-lg">
                        <h4 className="font-medium">User {item}</h4>
                        <p className="text-sm mt-1">
                          This is a sample comment about the news article and
                          its implications.
                        </p>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>2h ago</span>
                        <button className="hover:text-blue-600">Reply</button>
                        <button className="hover:text-blue-600">Like</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <textarea
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a comment..."
                    rows={3}
                  />
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:w-1/4 order-3 lg:order-3">
            <div className="sticky top-4 space-y-6">
              {/* Trending Now */}
              <div className="bg-white  p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4">Trending Now</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-gray-400 font-bold text-xl">
                        {item}
                      </span>
                      <div>
                        <h4 className="font-medium text-sm">
                          <a href="#" className="hover:text-blue-600">
                            Trending news headline that might interest readers
                          </a>
                        </h4>
                        <span className="text-xs text-gray-500">
                          {item * 2}h ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advertisement */}
              <div className="bg-white  p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4">Advertisement</h3>
                <div className="aspect-[4/5] bg-gray-100  rounded flex items-center justify-center">
                  <span className="text-gray-400">Ad Space</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white 0 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                <div className="space-y-3">
                  <p className="text-sm">Stay updated with our latest news</p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailsPage;
