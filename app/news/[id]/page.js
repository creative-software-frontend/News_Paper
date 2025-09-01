import Comment from '@/app/components/Comment/Comment';
import { getNews } from '@/app/lib/getNews';
import { getSingleNews } from '@/app/lib/getSingleNews';
import { getUserInfo } from '@/app/lib/getUserInfo';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const NewsDetailsPage = async ({ params }) => {
  const id = params?.id;
  const singleNews = await getSingleNews(id);

  const data = await getNews('সর্বশেষ');

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/news"
                className="hover:text-blue-600 transition-colors"
              >
                News
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium truncate max-w-xs">
              {singleNews.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Main Content */}
          <main className="lg:w-2/3">
            <article className="bg-white  border border-gray-100 overflow-hidden">
              {/* Featured Image */}
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src={
                    singleNews?.image?.startsWith('http')
                      ? singleNews.image
                      : singleNews?.image
                      ? `${process.env.NEXT_PUBLIC_ROOT_URL}${singleNews.image}`
                      : '/fallback.jpg'
                  }
                  alt={singleNews.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {singleNews.category || 'News'}
                    </span>
                    <span>
                      {new Date(singleNews.publish).toLocaleDateString(
                        'bn-BD',
                        {
                          weekday: 'long', // রোববার
                          year: 'numeric', // ২০২৫
                          month: 'long', // আগস্ট
                          day: 'numeric', // ৩১
                        }
                      )}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {singleNews.title}
                  </h1>

                  {singleNews.author && (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                        <Image
                          src={`https://i.pravatar.cc/150?u=${singleNews.author}`}
                          alt={singleNews.author}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {singleNews.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          Senior Journalist
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    <p className="text-xl  text-gray-800 mb-6">
                      {singleNews.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Innovation', 'Trending', 'Business'].map(
                      (tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Share this News:
                  </span>
                  <div className="flex gap-2">
                    {[
                      <FaFacebook />,
                      <FaXTwitter />,
                      <FaLinkedin />,
                      <FaWhatsapp />,
                    ].map((platform, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        title={`Share on ${platform}`}
                      >
                        <span className="text-sm font-medium">{platform}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <Comment singleNews={singleNews}></Comment>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-6 space-y-6">
              {/* Newsletter */}
              {/* <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest news delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-blue-200 text-white focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-blue-200 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div> */}

              {/* Related News - Minimalist */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  সর্বশেষ সংবাদ
                </h3>

                <div className="space-y-4  overflow-y-scroll h-80">
                  {data?.slice(0, 6).map(item => (
                    <article key={item.id} className="group">
                      <Link
                        href={`/news/${item.id}`}
                        className="flex gap-3 items-start"
                      >
                        {/* Image */}
                        <div className="flex-shrink-0 w-16 h-12 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={
                              item?.image?.startsWith('http')
                                ? item.image
                                : item?.image
                                ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.image}`
                                : '/fallback.jpg'
                            }
                            alt={item.title}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1 leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {item.publish
                              ? formatDistanceToNow(
                                  new Date(
                                    new Date(item.publish).getTime() +
                                      6 * 60 * 60 * 1000
                                  ),
                                  { addSuffix: true, locale: bn }
                                )
                              : '২২ মিনিট আগে'}
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                <Link
                  href="/"
                  className="block mt-4 pt-3 border-t border-gray-100 text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  আরও দেখুন
                </Link>
              </div>

              {/* Advertisement */}
              <div className="bg-white   border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  Sponsored
                </h3>
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3">
                    <span className="text-lg font-bold">Ad</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Premium Advertising Space
                  </p>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Learn more →
                  </button>
                </div>
              </div>

              {/* Trending Tags */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  Trending Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Technology',
                    'Politics',
                    'Sports',
                    'Health',
                    'Entertainment',
                    'Business',
                    'Science',
                    'Travel',
                  ].map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tags/${tag.toLowerCase()}`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
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
